import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { git, hash } from './graph.ts'
import { root, json, generate } from './import.ts'

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
export function clean(cwd = root) {
  if (git(cwd, 'status', '--porcelain'))
    throw new Error(
      'Branch operations require a clean checkout. Commit or stash your work first; nothing was changed.',
    )
}
export function mergeBaseline(cwd: string, branch: string) {
  // Deliberately use the normal merge strategy: conflicts must remain visible.
  execFileSync('git', ['-C', cwd, ...identity(cwd), 'merge', '--no-edit', branch], {
    stdio: 'inherit',
  })
}
export async function update(args: string[]) {
  clean()
  const current = git(root, 'symbolic-ref', '--short', 'HEAD')
  if (current === 'vendor/upstream')
    throw new Error('Run updates from your Spark integration branch, not vendor/upstream')
  if (args.includes('--bootstrap')) {
    const lock = json('vendor.lock.json')
    for (const file of Object.values(lock.files) as any[])
      if (hash(fs.readFileSync(path.join(root, file.destination), 'utf8')) !== file.generatedHash)
        throw new Error(`Bootstrap before customizing upstream sources: ${file.destination}`)
    run('branch', 'vendor/upstream', 'HEAD')
    console.log('Created vendor/upstream at the committed, uncustomized import baseline.')
    return
  }
  git(root, 'rev-parse', '--verify', 'vendor/upstream')
  const existing = json('vendor.lock.json').components as string[]
  const names = [...new Set([...existing, ...args.filter((a) => !a.startsWith('--'))])]
  const ark = process.env.ARK_REF || json('vendor.lock.json').upstream.ark.commit
  const zag = process.env.ZAG_REF || json('vendor.lock.json').upstream.zag.commit
  const suffix = `${Date.now()}-${hash(`${ark}:${zag}:${names}`).slice(0, 8)}`
  const candidate = `vendor/candidate-${suffix}`
  const integration = `update/upstream-${suffix}`
  run('switch', '-c', candidate, 'vendor/upstream')
  let committed = false
  try {
    await generate(names, { apply: true, baseline: true, ark, zag })
    // Only importer-owned paths enter the baseline commit. Custom entrypoints are seeded once.
    run('add', '--', 'packages', 'vendor.lock.json')
    if (git(root, 'diff', '--cached', '--name-only'))
      run('commit', '-m', `Update imported Ark/Zag baseline (${suffix})`)
    committed = true
    run('branch', '-f', 'vendor/upstream', 'HEAD')
  } catch (error) {
    console.error(
      `Generation failed on ${candidate}. Original branch ${current} is untouched; inspect this candidate before discarding it.`,
    )
    throw error
  }
  if (committed) {
    run('switch', '-c', integration, current)
    try {
      mergeBaseline(root, 'vendor/upstream')
    } catch {
      throw new Error(
        `Merge conflicts are preserved on ${integration}. Resolve them and commit, or use git merge --abort. Then run pnpm registry:build and pnpm verify-imports.`,
      )
    }
    execFileSync(process.execPath, ['scripts/vendor/import.ts', 'registry'], {
      cwd: root,
      stdio: 'inherit',
    })
    run('add', '--', 'registry.json')
    if (git(root, 'diff', '--cached', '--name-only'))
      run('commit', '-m', 'Regenerate registry after upstream merge')
    console.log(`Review ${integration}, run validation, then merge it into ${current}.`)
  }
}
if (process.argv[1]?.endsWith('/update.ts'))
  update(process.argv.slice(2)).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
