import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { git } from './graph.ts'
import { root } from './import.ts'

for (const scenario of ['preserve', 'overlap', 'delete-modified', 'add-delete']) {
  test(`complete updater workflow: ${scenario}`, () => {
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
      fs.symlinkSync(path.join(root, 'node_modules'), path.join(dirs.spark!, 'node_modules'), 'dir')
      put('spark', 'package.json', '{"type":"module"}\n')
      put(
        'spark',
        '.gitignore',
        'node_modules\npublic/\nregistry.react.json\nregistry.svelte.json\n',
      )
      put('spark', 'registry.json', '{"name":"fixture","items":[]}\n')
      const env = { ...process.env, ARK_SOURCE: dirs.ark, ZAG_SOURCE: dirs.zag }
      const run = (script: string, args: string[] = [], extra = {}) =>
        execFileSync(process.execPath, [`scripts/vendor/${script}.ts`, ...args], {
          cwd: dirs.spark,
          env: { ...env, ...extra },
          stdio: 'pipe',
        })
      run('import', ['import', 'sample', '--apply'])
      commit('spark', 'initial import')
      run('update', ['--bootstrap'])
      const original = git(dirs.spark!, 'rev-parse', 'vendor/upstream')
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
      commit('ark', 'upstream change')
      const refs = {
        ARK_REF: git(dirs.ark!, 'rev-parse', 'HEAD'),
        ZAG_REF: git(dirs.zag!, 'rev-parse', 'HEAD'),
      }
      if (scenario === 'overlap' || scenario === 'delete-modified') {
        assert.throws(() => run('update', [], refs))
        assert.ok(
          git(dirs.spark!, 'diff', '--name-only', '--diff-filter=U').includes(
            scenario === 'overlap' ? 'value.ts' : 'obsolete.ts',
          ),
        )
      } else {
        run('update', [], refs)
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
      assert.equal(git(dirs.spark!, 'rev-parse', 'main'), local)
      assert.notEqual(git(dirs.spark!, 'rev-parse', 'vendor/upstream'), original)
      assert.match(git(dirs.spark!, 'branch', '--show-current'), /^update\/upstream-/)
    } finally {
      fs.rmSync(base, { recursive: true, force: true })
    }
  })
}
