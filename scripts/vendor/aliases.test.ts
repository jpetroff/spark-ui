import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createServer } from 'vite'
import { root } from './import.ts'
import { relative, resolveSourceImport, sourceImport, syncAliases, viteAliases } from './aliases.ts'
import { rewriteModules } from './graph.ts'

function fixture() {
  const base = path.join(root, '.vendor-tests')
  fs.mkdirSync(base, { recursive: true })
  const dir = fs.mkdtempSync(path.join(base, 'aliases-'))
  const put = (file: string, content: string) => {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true })
    fs.writeFileSync(path.join(dir, file), content)
  }
  put('package.json', '{"type":"module"}')
  put('tsconfig.json', JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } }))
  return { dir, put, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) }
}

test('cross-component imports use aliases while local parent imports stay relative', () => {
  const from = 'packages/checkbox/src/react/ark/checkbox.tsx'
  assert.equal(
    sourceImport(from, 'packages/shared/src/react/zag/index.ts'),
    '@spark/shared/react/zag/index.ts',
  )
  assert.equal(
    sourceImport(from, 'packages/field/src/react/ark/context.ts'),
    '@spark/field/react/ark/context.ts',
  )
  assert.equal(sourceImport(from, 'packages/checkbox/src/common/types.ts'), '../../common/types.ts')
  assert.equal(sourceImport(from, 'packages/checkbox/src/react/context.ts'), '../context.ts')
  assert.equal(sourceImport(from, 'packages/checkbox/src/react/ark/context.ts'), './context.ts')
})

test('sync detects missing, stale and incorrect aliases and preserves unrelated configuration', () => {
  const { dir, put, cleanup } = fixture()
  try {
    put('packages/sample/src/react.tsx', '')
    put('packages/shared/src/common/helper.ts', '')
    put('packages/vendor-tools/package.json', '{}')
    assert.throws(() => syncAliases(dir, true), /stale/)
    const paths = syncAliases(dir)
    assert.deepEqual(paths, {
      '@/*': ['./src/*'],
      '@spark/sample/*': ['./packages/sample/src/*'],
      '@spark/shared/*': ['./packages/shared/src/*'],
    })
    const file = path.join(dir, 'tsconfig.json')
    const before = fs.readFileSync(file, 'utf8')
    syncAliases(dir)
    assert.equal(fs.readFileSync(file, 'utf8'), before)
    paths['@spark/shared/*'] = ['./wrong/*']
    put('tsconfig.json', JSON.stringify({ compilerOptions: { strict: true, paths } }))
    assert.throws(() => syncAliases(dir, true), /stale/)
    syncAliases(dir)
    fs.rmSync(path.join(dir, 'packages/sample'), { recursive: true })
    put('packages/presence/src/react/context.ts', '')
    assert.throws(() => syncAliases(dir, true), /stale/)
    const updated = syncAliases(dir)
    assert.ok(!('@spark/sample/*' in updated))
    assert.deepEqual(updated['@spark/presence/*'], ['./packages/presence/src/*'])
    assert.deepEqual(updated['@/*'], ['./src/*'])
    assert.equal(JSON.parse(fs.readFileSync(file, 'utf8')).compilerOptions.strict, true)
    syncAliases(dir, true)
  } finally {
    cleanup()
  }
})

test('alias resolution rejects missing mappings and paths escaping the component root', () => {
  const paths = { '@spark/shared/*': ['./packages/shared/src/*'] }
  const file = 'packages/sample/src/react/ark/index.ts'
  assert.equal(
    resolveSourceImport(file, '@spark/shared/react/zag/index.ts', paths),
    'packages/shared/src/react/zag/index.ts',
  )
  assert.equal(
    resolveSourceImport(file, '../types.ts', paths),
    'packages/sample/src/react/types.ts',
  )
  assert.equal(resolveSourceImport(file, 'react', paths), undefined)
  assert.throws(() => resolveSourceImport(file, '@spark/unknown/index.ts', paths), /Missing/)
  assert.throws(() => resolveSourceImport(file, '@spark/shared/../../escape.ts', paths), /Invalid/)
  assert.throws(() => resolveSourceImport(file, '@spark/shared', paths), /Invalid/)
})

test('Vite resolves aliases outside tsconfig include for client and SSR', async () => {
  const { dir, put, cleanup } = fixture()
  let server: Awaited<ReturnType<typeof createServer>> | undefined
  try {
    put('packages/shared/src/common/helper.ts', 'export const value = 1')
    put('packages/sample/src/react/ark/index.ts', '')
    server = await createServer({
      root: dir,
      configFile: false,
      resolve: { alias: viteAliases(syncAliases(dir), dir) },
      server: { middlewareMode: true, watch: null },
      optimizeDeps: { noDiscovery: true },
    })
    for (const name of ['client', 'ssr']) {
      const resolved = await server.environments[name]!.pluginContainer.resolveId(
        '@spark/shared/common/helper.ts',
        path.join(dir, 'packages/sample/src/react/ark/index.ts'),
      )
      assert.equal(resolved?.id, path.join(dir, 'packages/shared/src/common/helper.ts'))
    }
  } finally {
    await server?.close()
    cleanup()
  }
})

test('registry output resolves aliases to canonical installed files and verifier enforces boundaries', () => {
  const { dir, put, cleanup } = fixture()
  try {
    fs.cpSync(path.join(root, 'scripts/vendor'), path.join(dir, 'scripts/vendor'), {
      recursive: true,
    })
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(dir, 'node_modules'), 'dir')
    const files = {
      'packages/sample/src/react/ark/index.ts': `export { value } from '@spark/shared/react/zag/index.ts'; export type T = import('@spark/shared/react/zag/index.ts').T; const text = '@spark/shared/react/zag/index.ts'`,
      'packages/shared/src/react/zag/index.ts': 'export const value = 1; export type T = number',
      'packages/sample/src/svelte/ark/view.svelte': `<script module lang="ts">export { value } from '@spark/shared/common/helper.ts'</script><script lang="ts">import { value } from '@spark/shared/common/helper.ts'; let n = $state(value)</script><p>{n}</p>`,
      'packages/shared/src/common/helper.ts': 'export const value = 1',
    }
    for (const [file, content] of Object.entries(files)) put(file, content)
    for (const repo of ['ark', 'zag']) put(`packages/shared/src/licenses/${repo}-LICENSE`, repo)
    const lock = {
      files: Object.fromEntries(Object.keys(files).map((file) => [file, { destination: file }])),
      starters: [] as string[],
      entries: {
        'sample-react': {
          component: 'sample',
          framework: 'react',
          dependencies: [],
          files: Object.keys(files).filter((f) => !f.includes('/svelte/')),
        },
        'sample-svelte': {
          component: 'sample',
          framework: 'svelte',
          dependencies: [],
          files: Object.keys(files).filter((f) => !f.includes('/react/')),
        },
      },
    }
    for (const [file, content] of Object.entries({
      'packages/sample/src/react.tsx': "export * from './react/ark/index.ts'",
      'packages/sample/src/svelte.ts': "export { default as View } from './svelte/ark/view.svelte'",
      'packages/sample/src/styles.css': '',
    })) {
      put(file, content)
      lock.starters.push(file)
    }
    put('vendor.lock.json', JSON.stringify(lock))
    put('registry.json', '{"items":[]}')
    const paths = syncAliases(dir)
    const run = (command: string) =>
      execFileSync(process.execPath, ['scripts/vendor/import.ts', command], {
        cwd: dir,
        stdio: 'pipe',
      })
    run('verify')
    run('registry')
    const catalog = JSON.parse(fs.readFileSync(path.join(dir, 'registry.react.json'), 'utf8'))
    const item = JSON.parse(
      fs.readFileSync(path.join(dir, 'public/r/react/sample-react.json'), 'utf8'),
    )
    const release = new URL(item.registryDependencies[0]).pathname.split('/')[2]
    for (const framework of ['react', 'svelte']) {
      const folder = path.join(dir, 'public/r', release, framework)
      const entries = fs
        .readdirSync(folder)
        .flatMap((file) => JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8')).files)
      const targets = new Set(
        entries.map((entry: { target: string }) => entry.target.replace(/^@ui\//, '')),
      )
      for (const entry of entries) {
        rewriteModules(entry.path, entry.content, (specifier) => {
          assert.ok(!specifier.startsWith('@spark/'))
          if (specifier.startsWith('.')) {
            const installed = entry.target.replace(/^@ui\//, '')
            assert.ok(
              targets.has(
                path.posix.normalize(path.posix.join(path.posix.dirname(installed), specifier)),
              ),
            )
          }
          return specifier
        })
        const original = files[entry.path as keyof typeof files]
        if (original?.includes('const text'))
          assert.ok(entry.content.includes("const text = '@spark/shared/react/zag/index.ts'"))
      }
    }
    assert.ok(catalog.items.length > 0)
    put(
      'packages/shared/src/common/helper.ts',
      "export { value } from '@spark/shared/react/zag/index.ts'",
    )
    assert.throws(() => run('verify'), /Framework dependency in common source/)
    put(
      'packages/shared/src/common/helper.ts',
      "export { value } from '@spark/shared/common/missing.ts'",
    )
    assert.throws(() => run('verify'), /Unresolved import/)
    assert.equal(
      relative('sample/react/ark/index.ts', '_spark/react/zag/index.ts'),
      '../../../_spark/react/zag/index.ts',
    )
    assert.ok(paths['@spark/sample/*'])
  } finally {
    cleanup()
  }
})
