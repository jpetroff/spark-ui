import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { git, hash, rewriteModules } from './graph.ts'
import { relative, resolveSourceImport, syncAliases } from './aliases.ts'
import { root } from './import.ts'

for (const { mode, scenario } of ['local', 'refs'].flatMap((mode) =>
  ['preserve', 'overlap', 'delete-modified', 'add-delete', 'alias-migration'].map((scenario) => ({
    mode,
    scenario,
  })),
)) {
  test(`complete updater workflow: ${scenario} (${mode})`, () => {
    const base = fs.mkdtempSync(path.join(root, '.vendor-tests/update-'))
    const dirs = Object.fromEntries(
      ['ark', 'zag', 'spark'].map((name) => [name, path.join(base, name)]),
    )
    const put = (repo: string, file: string, content: string) => {
      const target = path.join(dirs[repo]!, file)
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, content)
    }
    const commit = (repo: string, message: string) => {
      git(dirs[repo]!, 'add', '.')
      git(dirs[repo]!, 'commit', '-qm', message)
    }
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
        const folder = `packages/${framework}/src${framework === 'svelte' ? '/lib' : ''}/components/sample`
        put(
          'ark',
          `${folder}/index.ts`,
          "export { value } from './value.ts'\nexport { obsolete } from './obsolete.ts'\n",
        )
        put('ark', `${folder}/value.ts`, 'export const value = 1\n')
        put('ark', `${folder}/obsolete.ts`, 'export const obsolete = 1\n')
        if (scenario === 'alias-migration') {
          put(
            'ark',
            `${folder}/index.ts`,
            "export { shared } from '../dependency/index.ts'\nexport { value } from './value.ts'\nexport { obsolete } from './obsolete.ts'\n",
          )
          put('ark', `${folder}/../dependency/index.ts`, 'export const shared = 1\n')
        }
      }
      put('ark', 'LICENSE', 'Ark fixture license\n')
      put('zag', 'LICENSE', 'Zag fixture license\n')
      put(
        'zag',
        'packages/core/package.json',
        JSON.stringify({ name: '@zag-js/core', version: '1.0.0', main: 'src/index.ts' }),
      )
      commit('ark', 'initial')
      commit('zag', 'initial')
      fs.cpSync(path.join(root, 'scripts/vendor'), path.join(dirs.spark!, 'scripts/vendor'), {
        recursive: true,
      })
      fs.copyFileSync(path.join(root, 'Makefile'), path.join(dirs.spark!, 'Makefile'))
      fs.symlinkSync(path.join(root, 'node_modules'), path.join(dirs.spark!, 'node_modules'), 'dir')
      put('spark', 'package.json', '{"type":"module"}\n')
      put(
        'spark',
        '.gitignore',
        'node_modules\npublic/\nregistry.react.json\nregistry.svelte.json\n.import.lock.json\n.import.lock.json.*.tmp\n',
      )
      put('spark', 'registry.json', '{"name":"fixture","items":[]}\n')
      put('spark', 'tsconfig.json', '{"compilerOptions":{"paths":{"@/*":["./src/*"]}}}\n')
      const env = { ...process.env }
      for (const key of ['ARK_SOURCE', 'ZAG_SOURCE', 'ARK_REF', 'ZAG_REF']) delete env[key]
      if (mode === 'refs') Object.assign(env, { ARK_SOURCE: dirs.ark, ZAG_SOURCE: dirs.zag })
      const run = (script: string, args: string[] = [], extra = {}) =>
        execFileSync(process.execPath, [`scripts/vendor/${script}.ts`, ...args], {
          cwd: dirs.spark,
          env: { ...env, ...extra },
          stdio: 'pipe',
        })
      run('import', ['import', 'sample', '--apply'])
      if (scenario === 'alias-migration') {
        // Recreate a v1 baseline, then migrate only the integration branch.
        const lock = JSON.parse(fs.readFileSync(path.join(dirs.spark!, 'vendor.lock.json'), 'utf8'))
        const paths = syncAliases(dirs.spark!)
        for (const entry of Object.values(lock.files) as any[]) {
          const content = fs.readFileSync(path.join(dirs.spark!, entry.destination), 'utf8')
          const legacy = rewriteModules(entry.destination, content, (specifier) => {
            const target = resolveSourceImport(entry.destination, specifier, paths)
            return target === undefined ? specifier : relative(entry.destination, target)
          })
          put('spark', entry.destination, legacy)
          entry.generatedHash = hash(legacy)
        }
        lock.importerVersion = 1
        put('spark', 'vendor.lock.json', JSON.stringify(lock, null, 2) + '\n')
        put(
          'spark',
          'tsconfig.json',
          JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } }, null, 2) + '\n',
        )
      }
      commit('spark', 'initial import')
      run('update', ['--bootstrap'])
      const original = git(dirs.spark!, 'rev-parse', 'vendor/upstream')
      if (scenario === 'alias-migration') {
        run('import', ['import', 'sample', '--apply'])
        commit('spark', 'migrate aliases')
        put(
          'spark',
          'packages/dependency/src/react/ark/index.ts',
          'export const shared = 1\nexport const custom = true\n',
        )
      }
      if (scenario === 'overlap')
        put('spark', 'packages/sample/src/react/ark/value.ts', 'export const value = 99\n')
      else if (scenario === 'delete-modified')
        put('spark', 'packages/sample/src/react/ark/obsolete.ts', 'export const obsolete = 99\n')
      else put('spark', 'packages/sample/src/styles.css', '.custom { color: red; }\n')
      commit('spark', 'customize')
      const local = git(dirs.spark!, 'rev-parse', 'main')
      put('ark', 'packages/react/src/components/sample/value.ts', 'export const value = 2\n')
      if (scenario === 'delete-modified' || scenario === 'add-delete') {
        fs.rmSync(path.join(dirs.ark!, 'packages/react/src/components/sample/obsolete.ts'))
        put(
          'ark',
          'packages/react/src/components/sample/index.ts',
          "export { value } from './value.ts'\nexport { added } from './added.ts'\n",
        )
        put('ark', 'packages/react/src/components/sample/added.ts', 'export const added = 3\n')
      }
      if (scenario === 'add-delete') {
        put(
          'ark',
          'packages/react/src/components/sample/added.ts',
          "export { extra } from '../extra/index.ts'\nexport const added = 3\n",
        )
        put('ark', 'packages/react/src/components/extra/index.ts', 'export const extra = 1\n')
      }
      commit('ark', 'upstream change')
      const refs = {
        ARK_REF: git(dirs.ark!, 'rev-parse', 'HEAD'),
        ZAG_REF: git(dirs.zag!, 'rev-parse', 'HEAD'),
      }
      if (mode === 'refs') {
        // Explicit commits must win even when the checked-out branches have moved on.
        put('ark', 'packages/react/src/components/sample/value.ts', 'export const value = 3\n')
        put('zag', 'LICENSE', 'Later Zag license\n')
        commit('ark', 'later upstream change')
        commit('zag', 'later upstream change')
      }
      const heads = Object.fromEntries(
        ['ark', 'zag'].map((repo) => [repo, git(dirs[repo]!, 'rev-parse', 'HEAD')]),
      )
      const makeUpdate = (args: string[] = []) =>
        execFileSync('make', ['update', ...args], {
          cwd: dirs.spark,
          env,
          stdio: 'pipe',
        })
      const makeArgs = mode === 'refs' ? Object.entries(refs).map(([k, v]) => `${k}=${v}`) : []
      if (scenario === 'preserve') {
        assert.throws(() => makeUpdate(['ARK_REF=missing-commit']))
        assert.equal(git(dirs.spark!, 'branch', '--show-current'), 'main')
        assert.equal(git(dirs.spark!, 'rev-parse', 'vendor/upstream'), original)
      }
      if (scenario === 'overlap' || scenario === 'delete-modified') {
        assert.throws(() => makeUpdate(makeArgs))
        assert.ok(
          git(dirs.spark!, 'diff', '--name-only', '--diff-filter=U').includes(
            scenario === 'overlap' ? 'value.ts' : 'obsolete.ts',
          ),
        )
      } else {
        makeUpdate(makeArgs)
        const lock = JSON.parse(fs.readFileSync(path.join(dirs.spark!, 'vendor.lock.json'), 'utf8'))
        assert.equal(lock.upstream.ark.commit, refs.ARK_REF)
        assert.equal(lock.upstream.zag.commit, refs.ZAG_REF)
        assert.equal(
          fs.readFileSync(path.join(dirs.spark!, 'packages/sample/src/styles.css'), 'utf8'),
          '.custom { color: red; }\n',
        )
        assert.match(
          fs.readFileSync(path.join(dirs.spark!, 'packages/sample/src/react/ark/value.ts'), 'utf8'),
          /= 2/,
        )
        if (scenario === 'add-delete') {
          assert.ok(
            !fs.existsSync(path.join(dirs.spark!, 'packages/sample/src/react/ark/obsolete.ts')),
          )
          assert.ok(fs.existsSync(path.join(dirs.spark!, 'packages/sample/src/react/ark/added.ts')))
        }
      }
      if (scenario === 'alias-migration') {
        assert.match(
          fs.readFileSync(
            path.join(dirs.spark!, 'packages/dependency/src/react/ark/index.ts'),
            'utf8',
          ),
          /custom = true/,
        )
        assert.match(
          fs.readFileSync(path.join(dirs.spark!, 'packages/sample/src/react/ark/index.ts'), 'utf8'),
          /@spark\/dependency\//,
        )
      }
      syncAliases(dirs.spark!, true)
      if (scenario === 'add-delete') {
        const config = JSON.parse(fs.readFileSync(path.join(dirs.spark!, 'tsconfig.json'), 'utf8'))
        assert.deepEqual(config.compilerOptions.paths['@spark/extra/*'], ['./packages/extra/src/*'])
      }
      if (scenario !== 'overlap' && scenario !== 'delete-modified')
        assert.equal(git(dirs.spark!, 'status', '--porcelain'), '')
      assert.equal(git(dirs.spark!, 'rev-parse', 'main'), local)
      assert.notEqual(git(dirs.spark!, 'rev-parse', 'vendor/upstream'), original)
      assert.match(git(dirs.spark!, 'branch', '--show-current'), /^update\/upstream-/)
      for (const repo of ['ark', 'zag']) {
        assert.equal(git(dirs[repo]!, 'rev-parse', 'HEAD'), heads[repo])
        assert.equal(git(dirs[repo]!, 'branch', '--show-current'), 'main')
        assert.equal(git(dirs[repo]!, 'status', '--porcelain'), '')
      }
    } finally {
      fs.rmSync(base, { recursive: true, force: true })
    }
  })
}
