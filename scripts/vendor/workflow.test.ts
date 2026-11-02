import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { format } from 'prettier'
import { git } from './graph.ts'
import { root } from './import.ts'
import { readLedger, type Operation } from './ledger.ts'

function fixture(bootstrap = true) {
  fs.mkdirSync(path.join(root, '.vendor-tests'), { recursive: true })
  const base = fs.mkdtempSync(path.join(root, '.vendor-tests/workflow-'))
  const dirs = Object.fromEntries(
    ['ark', 'zag', 'spark'].map((name) => [name, path.join(base, name)]),
  )
  const spark = dirs.spark!
  const put = (repo: string, file: string, content: string) => {
    const target = path.join(dirs[repo]!, file)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content)
  }
  const read = (file: string) => fs.readFileSync(path.join(spark, file), 'utf8')
  const commit = (repo = 'spark', message = 'fixture change') => {
    git(dirs[repo]!, 'add', '.')
    git(dirs[repo]!, 'commit', '-qm', message)
  }
  const env = { ...process.env }
  for (const key of ['ARK_SOURCE', 'ZAG_SOURCE', 'ARK_REF', 'ZAG_REF']) delete env[key]
  Object.assign(env, { ARK_SOURCE: dirs.ark, ZAG_SOURCE: dirs.zag })
  const run = (script: string, ...args: string[]) =>
    execFileSync(process.execPath, [`scripts/vendor/${script}.ts`, ...args], {
      cwd: spark,
      env,
      stdio: 'pipe',
    }).toString()
  const make = (...args: string[]) =>
    execFileSync('make', args, { cwd: spark, env, stdio: 'pipe' }).toString()
  const ledger = () => readLedger(true, spark)
  const latest = () => ledger().operations.at(-1)!
  const writeLedger = (operations: Operation[]) =>
    put('spark', '.import.lock.json', JSON.stringify({ version: 1, operations }, null, 2))
  const exists = (file: string) => fs.existsSync(path.join(spark, file))
  const hasBranch = (name: string) => git(spark, 'branch', '--list', name).trim().length > 0
  const importBranch = (...names: string[]) => {
    run('command', ...names)
    return latest()
  }
  const dispose = () => fs.rmSync(base, { recursive: true, force: true })
  try {
    for (const dir of Object.values(dirs)) {
      fs.mkdirSync(dir, { recursive: true })
      git(dir, 'init', '-q', '-b', 'main')
      git(dir, 'config', 'user.name', 'Fixture')
      git(dir, 'config', 'user.email', 'fixture@example.invalid')
    }
    for (const framework of ['react', 'svelte']) {
      put(
        'ark',
        `packages/${framework}/package.json`,
        JSON.stringify({
          name: `@ark-ui/${framework}`,
          version: '1.0.0',
          exports: { '.': './src/index.ts' },
        }),
      )
      const src = `packages/${framework}/src${framework === 'svelte' ? '/lib' : ''}`
      for (const component of ['sample', 'second', 'third']) {
        put(
          'ark',
          `${src}/components/${component}/index.ts`,
          "export { value } from './value.ts'\n",
        )
        put('ark', `${src}/components/${component}/value.ts`, 'export const value = 1\n')
      }
      put(
        'ark',
        `${src}/components/sample/index.ts`,
        "export { value } from './value.ts'\nexport { dependency } from '../dependency/index.ts'\nexport { common } from '../../utils/shared.ts'\n",
      )
      put('ark', `${src}/components/dependency/index.ts`, 'export const dependency = 1\n')
      put('ark', `${src}/utils/shared.ts`, 'export const common = 1\n')
    }
    put('ark', 'packages/react/src/components/only-react/index.ts', 'export const value = 1\n')
    put('ark', 'LICENSE', 'Ark fixture license\n')
    put('zag', 'LICENSE', 'Zag fixture license\n')
    put(
      'zag',
      'packages/core/package.json',
      JSON.stringify({ name: '@zag-js/core', version: '1.0.0', main: 'src/index.ts' }),
    )
    commit('ark')
    commit('zag')
    fs.cpSync(path.join(root, 'scripts/vendor'), path.join(spark, 'scripts/vendor'), {
      recursive: true,
    })
    fs.copyFileSync(path.join(root, 'Makefile'), path.join(spark, 'Makefile'))
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(spark, 'node_modules'), 'dir')
    put('spark', 'package.json', '{"type":"module"}\n')
    put(
      'spark',
      '.gitignore',
      'node_modules\npublic/\nregistry.react.json\nregistry.svelte.json\n.import.lock.json\n.import.lock.json.*.tmp\n',
    )
    put('spark', 'registry.json', '{"name":"fixture","items":[]}\n')
    put('spark', 'tsconfig.json', '{"compilerOptions":{"paths":{"@/*":["./src/*"]}}}\n')
    // Direct imports also work before HEAD exists, and must not commit the local ledger.
    run('command', 'sample')
    assert.equal(latest().source.commit, null)
    assert.equal(latest().status, 'imported')
    commit()
    if (bootstrap) run('update', '--bootstrap')
    return {
      base,
      dirs,
      spark,
      put,
      read,
      commit,
      run,
      make,
      ledger,
      latest,
      writeLedger,
      exists,
      hasBranch,
      importBranch,
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}

for (const form of ['positional', 'plural', 'legacy']) {
  test(`batch make import: ${form}`, () => {
    const f = fixture()
    try {
      if (form === 'positional') f.make('import', 'second', 'third', 'second')
      else f.make('import', `${form === 'plural' ? 'COMPONENTS' : 'COMPONENT'}=second third second`)
      const operation = f.latest()
      assert.deepEqual(operation.requestedComponents, ['second', 'third'])
      assert.deepEqual(operation.components, ['sample', 'second', 'third'])
      assert.equal(operation.mode, 'import')
      assert.equal(operation.status, 'ready')
      assert.match(operation.branches.candidate!.name, /^vendor\/candidate-2-components-/)
      assert.match(operation.branches.review!.name, /^update\/upstream-2-components-/)
      assert.ok(operation.report)
      assert.ok(operation.upstream?.ark.commit)
      assert.equal(git(f.spark, 'status', '--porcelain'), '')
      assert.equal(git(f.spark, 'ls-files', '.import.lock.json'), '')
      git(f.spark, 'switch', 'main')
      f.make('merge-import', `BRANCH=${operation.branches.review!.name}`)
      assert.equal(f.latest().status, 'complete')
      assert.ok(f.exists('packages/second/tsconfig.json'))
      assert.ok(f.exists('packages/third/tsconfig.json'))
      assert.ok(!f.hasBranch(operation.branches.candidate!.name))
      assert.ok(!f.hasBranch(operation.branches.review!.name))
      assert.ok(f.hasBranch('vendor/upstream'))
    } finally {
      f.dispose()
    }
  })
}

test('batch errors and dry runs preserve sources, refs, and the existing ledger', () => {
  const f = fixture()
  try {
    const original = git(f.spark, 'rev-parse', 'HEAD')
    const ledger = f.read('.import.lock.json')
    f.make('import', 'second', 'third', 'DRY_RUN=1')
    assert.equal(f.read('.import.lock.json'), ledger)
    assert.equal(git(f.spark, 'rev-parse', 'HEAD'), original)
    assert.equal(git(f.spark, 'status', '--porcelain'), '')
    assert.ok(!f.exists('packages/second'))
    assert.throws(() => f.make('import', 'second', 'COMPONENT=third'), /Choose positional/)
    assert.throws(
      () => f.make('import', 'COMPONENT=second', 'COMPONENTS=third'),
      /Choose COMPONENT/,
    )
    assert.throws(() => f.run('command', 'second', 'does-not-exist'), /No upstream implementation/)
    assert.ok(!f.exists('packages/second'))
    assert.equal(git(f.spark, 'rev-parse', 'main'), original)
    const failed = f.latest()
    assert.equal(failed.status, 'failed')
    assert.ok(failed.events.some((event) => event.level === 'warning'))
    assert.ok(
      failed.events.some(
        (event) => event.level === 'error' && event.message.includes('does-not-exist'),
      ),
    )
    assert.ok(failed.branches.candidate)
    assert.ok(!failed.branches.review)
  } finally {
    f.dispose()
  }
})

test('direct imports generate and repair configs without replacing custom configs or registering them', async () => {
  const f = fixture(false)
  try {
    const expected = { extends: '../../tsconfig.json', include: ['src'] }
    for (const component of ['sample', 'shared', 'dependency'])
      assert.deepEqual(JSON.parse(f.read(`packages/${component}/tsconfig.json`)), expected)
    for (const file of [
      'tsconfig.json',
      'packages/sample/tsconfig.json',
      'packages/dependency/tsconfig.json',
    ]) {
      const content = f.read(file)
      assert.equal(content, await format(content, { filepath: file }))
    }
    const custom = '{"extends":"../../tsconfig.json","include":["src"],"custom":true}\n'
    f.put('spark', 'packages/sample/tsconfig.json', custom)
    fs.rmSync(path.join(f.spark, 'packages/dependency/tsconfig.json'))
    f.run('command', 'second', 'only-react')
    assert.equal(f.read('packages/sample/tsconfig.json'), custom)
    assert.deepEqual(JSON.parse(f.read('packages/dependency/tsconfig.json')), expected)
    assert.ok(f.exists('packages/second/tsconfig.json'))
    assert.equal(f.latest().status, 'imported')
    assert.ok(
      f
        .latest()
        .events.some((event) => event.level === 'warning' && event.message.includes('No svelte')),
    )
    f.run('import', 'registry')
    assert.ok(!f.read('registry.json').includes('tsconfig.json'))
    assert.ok(
      !JSON.parse(f.read('vendor.lock.json')).starters.some((file: string) =>
        file.endsWith('tsconfig.json'),
      ),
    )
    const before = f.read('.import.lock.json')
    f.run('command', 'third', '--dry-run')
    assert.equal(f.read('.import.lock.json'), before)
    assert.ok(!f.exists('packages/third'))
    assert.throws(() => f.run('command', 'third', 'missing'), /No upstream implementation/)
    assert.ok(!f.exists('packages/third'))
  } finally {
    f.dispose()
  }
})

test('merge uses the current target and preserves the baseline and unrelated branches', () => {
  const f = fixture()
  try {
    git(f.spark, 'branch', 'unrelated')
    const operation = f.importBranch('second', 'second')
    assert.match(operation.branches.review!.name, /^update\/upstream-second-/)
    const baseline = git(f.spark, 'rev-parse', 'vendor/upstream')
    assert.throws(() => f.run('merge'), /service branches cannot/)
    git(f.spark, 'switch', '-c', 'release', 'main')
    f.put('spark', 'release.txt', 'release-specific change\n')
    f.commit()
    f.run('merge')
    assert.equal(git(f.spark, 'branch', '--show-current'), 'release')
    assert.ok(f.exists('release.txt'))
    assert.equal(f.latest().merge!.target, 'release')
    assert.equal(git(f.spark, 'rev-parse', 'vendor/upstream'), baseline)
    assert.ok(f.hasBranch('unrelated'))
    assert.ok(f.exists('packages/second/src/react.tsx'))
    const merged = git(f.spark, 'rev-parse', 'HEAD')
    f.run('merge', operation.branches.review!.name)
    assert.equal(git(f.spark, 'rev-parse', 'HEAD'), merged)
  } finally {
    f.dispose()
  }
})

test('merge conflicts retain branches and a retry cleans up after manual resolution', () => {
  const f = fixture()
  try {
    const operation = f.importBranch('second')
    f.put('spark', 'overlap.txt', 'review version\n')
    f.commit()
    git(f.spark, 'switch', 'main')
    f.put('spark', 'overlap.txt', 'target version\n')
    f.commit()
    assert.throws(() => f.run('merge'), /CONFLICT|failed/)
    assert.equal(f.latest().status, 'conflicted')
    assert.ok(
      f
        .latest()
        .events.some((event) => event.level === 'error' && event.message.includes('CONFLICT')),
    )
    assert.ok(git(f.spark, 'diff', '--name-only', '--diff-filter=U').includes('overlap.txt'))
    for (const branch of Object.values(operation.branches)) assert.ok(f.hasBranch(branch.name))
    f.put('spark', 'overlap.txt', 'resolved version\n')
    f.commit()
    const resolved = git(f.spark, 'rev-parse', 'HEAD')
    f.run('merge')
    assert.equal(git(f.spark, 'rev-parse', 'HEAD'), resolved)
    assert.equal(f.latest().status, 'complete')
  } finally {
    f.dispose()
  }
})

test('cleanup retains changed candidates and worktree branches, then resumes without merging again', () => {
  const f = fixture()
  try {
    const operation = f.importBranch('second')
    const candidate = operation.branches.candidate!
    const review = operation.branches.review!
    git(f.spark, 'switch', candidate.name)
    f.put('spark', 'inspect.txt', 'candidate-only change\n')
    f.commit()
    const changed = git(f.spark, 'rev-parse', 'HEAD')
    git(f.spark, 'switch', 'main')
    const worktree = path.join(f.base, 'review-worktree')
    git(f.spark, 'worktree', 'add', worktree, review.name)
    assert.throws(() => f.run('merge'), /some branches were retained/)
    assert.equal(f.latest().status, 'merged')
    assert.ok(f.latest().cleanup!.every((entry) => entry.status === 'retained'))
    assert.equal(git(f.spark, 'rev-parse', candidate.name), changed)
    const merged = git(f.spark, 'rev-parse', 'HEAD')
    git(f.spark, 'worktree', 'remove', worktree)
    // Preserve the extra candidate commit under an unrelated branch before restoring its tip.
    git(f.spark, 'branch', 'saved-candidate', candidate.name)
    git(f.spark, 'branch', '-f', candidate.name, candidate.commit)
    f.run('merge')
    assert.equal(git(f.spark, 'rev-parse', 'HEAD'), merged)
    assert.equal(f.latest().status, 'complete')
    assert.ok(f.hasBranch('saved-candidate'))
  } finally {
    f.dispose()
  }
})

test('merge rejects ambiguous, missing, malformed, dirty, detached, and incomplete inputs', () => {
  const f = fixture()
  try {
    const first = f.importBranch('second')
    git(f.spark, 'switch', 'main')
    const second = f.importBranch('third')
    git(f.spark, 'switch', 'main')
    assert.throws(() => f.run('merge'), /Several imports/)
    assert.throws(() => f.run('merge', first.branches.candidate!.name), /No matching/)
    f.put('spark', 'dirty.txt', 'untracked\n')
    assert.throws(() => f.run('merge', first.branches.review!.name), /clean checkout/)
    fs.rmSync(path.join(f.spark, 'dirty.txt'))
    git(f.spark, 'switch', '--detach')
    assert.throws(() => f.run('merge', first.branches.review!.name))
    git(f.spark, 'switch', 'main')
    const ledger = f.read('.import.lock.json')
    f.put('spark', '.import.lock.json', '{"version":999,"operations":[]}')
    assert.throws(() => f.run('merge'), /Malformed/)
    f.put('spark', '.import.lock.json', '{not json')
    assert.throws(() => f.run('merge'), /Malformed/)
    f.put('spark', '.import.lock.json', ledger)
    const corrupt = f.ledger().operations
    Object.assign(corrupt.at(-1)!.branches, {
      other: { name: 'unrelated', commit: second.source.commit },
    })
    f.writeLedger(corrupt)
    assert.throws(() => f.run('merge'), /Malformed/)
    f.put('spark', '.import.lock.json', ledger)
    fs.rmSync(path.join(f.spark, '.import.lock.json'))
    assert.throws(() => f.run('merge'), /Missing .import.lock/)
    f.put('spark', '.import.lock.json', ledger)
    git(f.spark, 'branch', '-f', first.branches.review!.name, 'main')
    assert.throws(() => f.run('merge', first.branches.review!.name), /recorded import baseline/)
    git(f.spark, 'branch', '-D', first.branches.review!.name)
    assert.throws(() => f.run('merge', first.branches.review!.name), /Missing local review/)
    assert.ok(f.hasBranch('vendor/upstream'))
    assert.ok(f.hasBranch(first.branches.candidate!.name))
  } finally {
    f.dispose()
  }
})

test('ordinary updates are recorded and interrupted cleanup tolerates an already deleted branch', () => {
  const f = fixture()
  try {
    f.put('ark', 'packages/react/src/components/sample/value.ts', 'export const value = 2\n')
    f.commit('ark')
    f.make('update')
    const operation = f.latest()
    assert.equal(operation.mode, 'update')
    assert.match(operation.branches.review!.name, /^update\/upstream-sample-/)
    git(f.spark, 'switch', 'main')
    git(f.spark, 'merge', '--no-edit', operation.branches.review!.name)
    git(f.spark, 'branch', '-d', operation.branches.candidate!.name)
    const head = git(f.spark, 'rev-parse', 'HEAD')
    f.run('merge')
    assert.equal(git(f.spark, 'rev-parse', 'HEAD'), head)
    assert.equal(f.latest().status, 'complete')
    assert.ok(f.latest().cleanup!.some((entry) => entry.status === 'missing'))
  } finally {
    f.dispose()
  }
})
