import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { git, hash } from './graph.ts'
import { root, json, generate } from './import.ts'
import {
  startOperation,
  saveOperation,
  failOperation,
  generationOptions,
  execute,
  log,
  type Operation,
} from './ledger.ts'

function identity(cwd: string) {
  const args: string[] = []
  for (const [setting, fallback] of [
    ['user.name', 'Spark UI Importer'],
    ['user.email', 'spark-ui-importer@localhost'],
  ]) {
    try {
      git(cwd, 'config', '--get', setting!)
    } catch {
      args.push('-c', `${setting}=${fallback}`)
    }
  }
  return args
}
const run = (...args: string[]) =>
  execFileSync('git', ['-C', root, ...identity(root), ...args], { stdio: 'inherit' })
export function runGit(cwd: string, args: string[], operation: Operation) {
  execute(operation, 'git', ['-C', cwd, ...identity(cwd), ...args], cwd)
}
export function clean(cwd = root) {
  if (git(cwd, 'status', '--porcelain'))
    throw new Error(
      'Branch operations require a clean checkout. Commit or stash your work first; nothing was changed.',
    )
}
export function mergeBaseline(cwd: string, branch: string, operation?: Operation) {
  // Deliberately use the normal merge strategy: conflicts must remain visible.
  if (operation) return runGit(cwd, ['merge', '--no-edit', branch], operation)
  execFileSync('git', ['-C', cwd, ...identity(cwd), 'merge', '--no-edit', branch], {
    stdio: 'inherit',
  })
}
export async function update(args: string[], mode: Operation['mode'] = 'update') {
  if (args.includes('--bootstrap')) {
    clean()
    const current = git(root, 'symbolic-ref', '--short', 'HEAD')
    if (current === 'vendor/upstream')
      throw new Error('Run updates from your Spark integration branch, not vendor/upstream')
    const lock = json('vendor.lock.json')
    for (const file of Object.values(lock.files) as any[])
      if (hash(fs.readFileSync(path.join(root, file.destination), 'utf8')) !== file.generatedHash)
        throw new Error(`Bootstrap before customizing upstream sources: ${file.destination}`)
    run('branch', 'vendor/upstream', 'HEAD')
    console.log('Created vendor/upstream at the committed, uncustomized import baseline.')
    return
  }
  const operation = startOperation(
    mode,
    args.filter((a) => !a.startsWith('--')),
  )
  try {
    if (args.some((arg) => arg.startsWith('--'))) throw new Error('Unsupported update option')
    clean()
    const current = operation.source.name
    if (!operation.source.commit) throw new Error('Commit the initial import before updating')
    if (current === 'vendor/upstream')
      throw new Error('Run updates from your Spark integration branch, not vendor/upstream')
    const baseline = git(root, 'rev-parse', '--verify', 'refs/heads/vendor/upstream')
    const lock = json('vendor.lock.json')
    const names = [...new Set([...lock.components, ...operation.requestedComponents])].sort()
    operation.components = names
    const ark = git(
      path.resolve(root, process.env.ARK_SOURCE ?? '../ark'),
      'rev-parse',
      '--verify',
      `${process.env.ARK_REF || lock.upstream.ark.commit}^{commit}`,
    )
    const zag = git(
      path.resolve(root, process.env.ZAG_SOURCE ?? '../zag'),
      'rev-parse',
      '--verify',
      `${process.env.ZAG_REF || lock.upstream.zag.commit}^{commit}`,
    )
    operation.upstream = { ark: { commit: ark }, zag: { commit: zag } }
    const labeled = operation.requestedComponents.length ? operation.requestedComponents : names
    if (!labeled.length || labeled.some((name) => !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)))
      throw new Error('Provide valid lowercase component names')
    const label = labeled.length === 1 ? labeled[0] : `${labeled.length}-components`
    const suffix = `${label}-${Date.now()}-${hash(`${ark}:${zag}:${names}:${operation.id}`).slice(0, 8)}`
    const candidate = `vendor/candidate-${suffix}`
    const integration = `update/upstream-${suffix}`
    operation.branches.candidate = { name: candidate, commit: baseline }
    operation.phase = 'candidate'
    saveOperation(operation)
    runGit(root, ['switch', '-c', candidate, 'vendor/upstream'], operation)
    operation.phase = 'generation'
    saveOperation(operation)
    await generate(names, {
      apply: true,
      baseline: true,
      ark,
      zag,
      ...generationOptions(operation),
    })
    // Only importer-owned paths enter the baseline commit. Custom entrypoints are seeded once.
    runGit(root, ['add', '--', 'packages', 'vendor.lock.json', 'tsconfig.json'], operation)
    if (git(root, 'diff', '--cached', '--name-only'))
      runGit(root, ['commit', '-m', `Update imported Ark/Zag baseline (${suffix})`], operation)
    operation.branches.candidate.commit = git(root, 'rev-parse', 'HEAD')
    operation.phase = 'baseline'
    saveOperation(operation)
    runGit(root, ['branch', '-f', 'vendor/upstream', 'HEAD'], operation)
    operation.branches.review = { name: integration, commit: operation.source.commit }
    operation.phase = 'integration'
    saveOperation(operation)
    runGit(root, ['switch', '-c', integration, current], operation)
    try {
      mergeBaseline(root, 'vendor/upstream', operation)
    } catch {
      operation.status = 'conflicted'
      throw new Error(
        `Merge conflicts are preserved on ${integration}. Resolve them and commit, or use git merge --abort. Then run pnpm registry:build and pnpm verify-imports.`,
      )
    }
    operation.branches.review.commit = git(root, 'rev-parse', 'HEAD')
    operation.phase = 'registry'
    saveOperation(operation)
    execute(operation, process.execPath, ['scripts/vendor/import.ts', 'registry'])
    runGit(root, ['add', '--', 'registry.json'], operation)
    if (git(root, 'diff', '--cached', '--name-only'))
      runGit(root, ['commit', '-m', 'Regenerate registry after upstream merge'], operation)
    operation.branches.review.commit = git(root, 'rev-parse', 'HEAD')
    operation.status = 'ready'
    operation.phase = 'review'
    log(
      operation,
      'info',
      `Review ${integration}, then merge it from your target branch with pnpm vendor:merge`,
    )
    console.log(`Review ${integration}, run validation, then merge it into ${current}.`)
  } catch (error) {
    failOperation(operation, error)
    console.error(
      `Import stopped during ${operation.phase}; inspect .import.lock.json and the recorded branches. Original branch ${operation.source.name} is untouched.`,
    )
    throw error
  }
}
if (process.argv[1]?.endsWith('/update.ts'))
  update(process.argv.slice(2)).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
