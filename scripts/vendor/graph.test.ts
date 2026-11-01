import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import semver from 'semver'
import { Graph, Snapshot, git, rewriteModules } from './graph.ts'
import { constraints, installed, root } from './import.ts'
import { clean, mergeBaseline } from './update.ts'

const base = path.join(root, '.vendor-tests')
fs.mkdirSync(base, { recursive: true })
function repository() {
  const dir = fs.mkdtempSync(path.join(base, 'git-'))
  git(dir, 'init', '-q', '-b', 'main')
  git(dir, 'config', 'user.name', 'Fixture')
  git(dir, 'config', 'user.email', 'fixture@example.invalid')
  return dir
}
function put(dir: string, file: string, content: string) {
  fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true })
  fs.writeFileSync(path.join(dir, file), content)
}
function commit(dir: string, message: string) {
  git(dir, 'add', '.')
  git(dir, 'commit', '-qm', message)
}

test('rewrites imports, reexports, type references and literal dynamic imports without touching strings', () => {
  const input = `"use client"; import type { X } from 'one'; export { y } from 'two'; type T = import('three').T; const p = import('four'); const text = 'one';`
  const output = rewriteModules('a.ts', input, (s) => `./${s}`)
  assert.match(output, /"use client"/)
  assert.match(output, /from '\.\/one'/)
  assert.match(output, /import\('\.\/three'\)/)
  assert.match(output, /text = 'one'/)
  assert.throws(() => rewriteModules('a.ts', 'import(variable)', (s) => s), /Non-literal/)
})
test('rewrites both Svelte scripts and preserves markup and runes', () => {
  const input = `<script module lang="ts">import type { X } from 'types';</script>\n<script lang="ts">import Child from './child.svelte'; let n = $state(0)</script><Child />`
  const output = rewriteModules('a.svelte', input, (s) => (s === 'types' ? './types.ts' : s))
  assert.match(output, /from '\.\/types.ts'/)
  assert.match(output, /\$state\(0\)/)
  assert.ok(output.endsWith('<Child />'))
})
test('external ranges are intersected, including alternatives', () => {
  assert.ok(semver.satisfies('1.5.0', constraints(['^1.0.0', '>=1.4.0'])))
  assert.ok(!semver.satisfies('1.3.0', constraints(['^1.0.0', '>=1.4.0'])))
  assert.throws(() => constraints(['^1', '^2']), /Incompatible/)
  assert.match(constraints(['^1 || ^2', '>=2']), />=2/)
})
test('snapshot reads committed files and rejects dirty input', () => {
  const dir = repository()
  try {
    put(dir, 'source.ts', 'export const a = 1')
    commit(dir, 'initial')
    const snapshot = new Snapshot(dir, 'HEAD')
    assert.equal(snapshot.read('source.ts'), 'export const a = 1')
    put(dir, 'source.ts', 'changed')
    assert.throws(() => new Snapshot(dir, 'HEAD'), /uncommitted/)
    assert.throws(() => clean(dir), /clean checkout/)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
test('graph follows aliases and cycles, narrows pure barrels, and keeps canonical contexts', () => {
  const ark = repository(),
    zag = repository()
  try {
    put(
      ark,
      'packages/react/package.json',
      JSON.stringify({
        name: '@ark-ui/react',
        sideEffects: false,
        exports: { '.': './src/index.ts' },
        peerDependencies: { react: '>=18' },
      }),
    )
    put(
      ark,
      'packages/react/src/components/checkbox/index.ts',
      `import { context } from '../field/index.ts'; import { context as again } from '../field/context.ts'; export { context, again }`,
    )
    put(
      ark,
      'packages/react/src/components/field/index.ts',
      `export { context } from './context.ts'; export { unrelated } from './unrelated.ts'`,
    )
    put(
      ark,
      'packages/react/src/components/field/context.ts',
      `import { x } from './cycle.ts'; export const context = x`,
    )
    put(
      ark,
      'packages/react/src/components/field/cycle.ts',
      `import type { context } from './context.ts'; export const x = 1`,
    )
    put(ark, 'packages/react/src/components/field/unrelated.ts', `export const unrelated = 1`)
    put(zag, 'README.md', 'fixture')
    commit(ark, 'initial')
    commit(zag, 'initial')
    const graph = new Graph(new Snapshot(ark, 'HEAD'), new Snapshot(zag, 'HEAD'))
    const id = graph.visit({ repo: 'ark', file: 'packages/react/src/components/checkbox/index.ts' })
    assert.equal(graph.closure(id).length, 3)
    assert.equal(
      [...graph.nodes.values()].filter((n) => n.destination.endsWith('/context.ts')).length,
      1,
    )
    assert.ok(![...graph.nodes.keys()].some((k) => k.includes('unrelated')))
  } finally {
    fs.rmSync(ark, { recursive: true, force: true })
    fs.rmSync(zag, { recursive: true, force: true })
  }
})
for (const scenario of ['independent', 'overlap', 'delete-modified', 'add-delete'])
  test(`three-way update: ${scenario}`, () => {
    const dir = repository()
    try {
      put(dir, 'source.ts', 'first\nmiddle\nlast\n')
      put(dir, 'obsolete.ts', 'old\n')
      commit(dir, 'base')
      git(dir, 'branch', 'vendor/upstream')
      if (scenario === 'independent') put(dir, 'custom.css', '.custom {}\n')
      else if (scenario !== 'add-delete') put(dir, 'source.ts', 'local\nmiddle\nlast\n')
      else put(dir, 'custom.css', 'local\n')
      commit(dir, 'local')
      git(dir, 'switch', '-q', 'vendor/upstream')
      if (scenario === 'delete-modified') fs.rmSync(path.join(dir, 'source.ts'))
      else put(dir, 'source.ts', 'upstream\nmiddle\nlast\n')
      fs.rmSync(path.join(dir, 'obsolete.ts'))
      put(dir, 'added.ts', 'new\n')
      commit(dir, 'upstream')
      git(dir, 'switch', '-q', 'main')
      if (scenario === 'overlap' || scenario === 'delete-modified') {
        assert.throws(() => mergeBaseline(dir, 'vendor/upstream'))
        assert.ok(git(dir, 'diff', '--name-only', '--diff-filter=U').includes('source.ts'))
        git(dir, 'merge', '--abort')
        assert.match(fs.readFileSync(path.join(dir, 'source.ts'), 'utf8'), /^local/)
      } else {
        mergeBaseline(dir, 'vendor/upstream')
        assert.ok(fs.existsSync(path.join(dir, 'custom.css')))
        assert.ok(fs.existsSync(path.join(dir, 'added.ts')))
        assert.ok(!fs.existsSync(path.join(dir, 'obsolete.ts')))
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

test('React customization entrypoints retain TSX in consumer projects', () => {
  assert.equal(installed('packages/checkbox/src/react.tsx'), 'checkbox/index.tsx')
  assert.equal(installed('packages/checkbox/src/svelte.ts'), 'checkbox/index.ts')
})
