import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { root, buildRegistry, stringify } from './import.ts'
import { hash } from './graph.ts'

const require = createRequire(import.meta.url)
const base = path.join(root, '.vendor-tests/consumers')
const write = (dir: string, file: string, content: string) => {
  fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true })
  fs.writeFileSync(path.join(dir, file), content)
}
export const run = (command: string, args: string[], cwd = root) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', 'inherit', 'inherit'],
      env: { ...process.env, CI: 'true', npm_config_ignore_workspace: 'true' },
    })
    child.stdin?.on('error', () => {})
    child.stdin?.end('n\n')
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)),
    )
  })
const server = http.createServer((req, res) => {
  const file = path.resolve(root, 'public', `.${decodeURIComponent(req.url!.split('?')[0]!)}`)
  if (!file.startsWith(path.join(root, 'public') + path.sep) || !fs.existsSync(file)) {
    res.writeHead(404)
    res.end()
    return
  }
  res.setHeader('Content-Type', 'application/json')
  res.end(fs.readFileSync(file))
})
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
const address = server.address() as { port: number }
process.env.REGISTRY_BASE_URL = `http://127.0.0.1:${address.port}/r`
buildRegistry()
try {
  for (const framework of ['react', 'svelte'] as const) {
    const dir = path.join(base, framework)
    fs.rmSync(dir, { recursive: true, force: true })
    fs.mkdirSync(dir, { recursive: true })
    write(dir, 'pnpm-workspace.yaml', 'packages: []\nallowBuilds:\n  esbuild: true\n')
    const dependencies =
      framework === 'react' ? { react: '19.3.1', 'react-dom': '19.3.1' } : { svelte: '5.57.2' }
    const devDependencies = {
      vite: '8.3.5',
      typescript: '6.0.3',
      '@types/node': '26.6.6',
      ...(framework === 'react'
        ? {
            '@vitejs/plugin-react': '6.1.2',
            '@types/react': '19.3.0',
            '@types/react-dom': '19.3.0',
          }
        : { '@sveltejs/vite-plugin-svelte': '7.3.1', 'svelte-check': '4.7.6' }),
    }
    write(
      dir,
      'package.json',
      stringify({
        name: `spark-consumer-${framework}`,
        private: true,
        type: 'module',
        packageManager: 'pnpm@12.16.1',
        dependencies,
        devDependencies,
      }),
    )
    write(
      dir,
      'tsconfig.json',
      stringify({
        compilerOptions: {
          target: 'ES2022',
          lib: ['ES2023', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          jsx: 'react-jsx',
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          allowImportingTsExtensions: true,
          types: ['node', 'vite/client', ...(framework === 'svelte' ? ['svelte'] : [])],
          paths: { '@/*': ['./src/*'], '$lib/*': ['./src/lib/*'] },
        },
        include: ['src/**/*'],
      }),
    )
    const aliases = {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      hooks: '@/hooks',
      lib: '@/lib',
    }
    write(
      dir,
      'components.json',
      stringify(
        framework === 'react'
          ? {
              $schema: 'https://ui.shadcn.com/schema.json',
              style: 'new-york',
              rsc: false,
              tsx: true,
              tailwind: {
                config: '',
                css: 'src/app.css',
                baseColor: 'neutral',
                cssVariables: true,
              },
              aliases,
            }
          : {
              $schema: 'https://shadcn-svelte.com/schema.json',
              style: 'new-york',
              tailwind: { css: 'src/app.css', baseColor: 'neutral' },
              aliases,
              typescript: true,
              registry: 'https://shadcn-svelte.com/registry',
            },
      ),
    )
    write(dir, 'src/app.css', ':root { --fixture-large-row: 3rem; }\n')
    write(
      dir,
      'src/custom.module.css',
      '.custom { --size-row-min: var(--fixture-large-row); padding-inline: 1.5rem; }',
    )
    write(
      dir,
      'vite.config.ts',
      `import {defineConfig} from 'vite'; import ${framework === 'react' ? 'react' : '{svelte}'} from '${framework === 'react' ? '@vitejs/plugin-react' : '@sveltejs/vite-plugin-svelte'}'; export default defineConfig({plugins:[${framework === 'react' ? 'react' : 'svelte'}()],resolve:{alias:{'@':new URL('./src',import.meta.url).pathname}}})`,
    )
    if (framework === 'svelte') write(dir, 'svelte.config.js', `export default {}`)
    write(dir, 'index.html', '<html><body><div id="app"></div></body></html>')
    await run('pnpm', ['install', '--ignore-workspace', '--no-frozen-lockfile'], dir)
    const cli = path.join(
      root,
      'node_modules',
      framework === 'react' ? 'shadcn/dist/index.js' : 'shadcn-svelte/dist/index.mjs',
    )
    const names = [
      'button',
      'checkbox',
      'field',
      'dialog',
      'popover',
      'locale',
      'environment',
      'date-picker',
      'select',
    ]
    const urls = names.map(
      (name) => `${process.env.REGISTRY_BASE_URL}/${framework}/${name}-${framework}.json`,
    )
    await run(process.execPath, [
      cli,
      'add',
      urls.at(-1)!,
      '--cwd',
      dir,
      '--yes',
      ...(framework === 'svelte' ? ['--no-deps-install', '--skip-preflight'] : []),
    ])
    const ui = path.join(dir, 'src/components/ui')
    const themeDir = path.join(ui, 'themes/default')
    assert.ok(fs.existsSync(path.join(ui, 'styles/functional-tokens.css')))
    assert.ok(!fs.existsSync(path.join(ui, 'styles/tokens.css')))
    assert.ok(!fs.existsSync(themeDir))
    const globalStyles = fs.readFileSync(path.join(dir, 'src/app.css'), 'utf8')
    const override = ':root { --color-outline-focus: rebeccapurple; }\n'
    write(dir, 'src/project-theme.css', override)
    await run(process.execPath, [
      cli,
      'add',
      ...urls,
      '--cwd',
      dir,
      '--yes',
      '--overwrite',
      ...(framework === 'svelte' ? ['--no-deps-install', '--skip-preflight'] : []),
    ])
    if (framework === 'svelte')
      await run('pnpm', ['install', '--ignore-workspace', '--no-frozen-lockfile'], dir)
    const walk = (folder: string): string[] =>
      fs
        .readdirSync(folder, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory() ? walk(path.join(folder, e.name)) : [path.join(folder, e.name)],
        )
    const files = walk(path.join(dir, 'src/components/ui'))
    assert.ok(!files.some((file) => /functional-(react|svelte)\./.test(file)))
    for (const name of ['button', 'checkbox', 'field', 'dialog', 'popover', 'date-picker']) {
      const index = path.join(
        dir,
        `src/components/ui/${name}/index.${framework === 'react' ? 'tsx' : 'ts'}`,
      )
      assert.doesNotMatch(fs.readFileSync(index, 'utf8'), /recipe\.css|spark-theme-/)
      assert.ok(!fs.existsSync(path.join(ui, name, 'recipe.css')))
    }
    const before = new Map(files.map((file) => [file, hash(fs.readFileSync(file, 'utf8'))]))
    await run(process.execPath, [
      cli,
      'add',
      ...urls.reverse(),
      '--cwd',
      dir,
      '--yes',
      '--overwrite',
      ...(framework === 'svelte' ? ['--no-deps-install', '--skip-preflight'] : []),
    ])
    for (const [file, digest] of before)
      assert.equal(hash(fs.readFileSync(file, 'utf8')), digest, `Order changed ${file}`)
    for (const file of files) {
      assert.ok(
        !file.includes(`/${framework === 'react' ? 'svelte' : 'react'}/`),
        `Wrong framework installed: ${file}`,
      )
      assert.doesNotMatch(
        fs.readFileSync(file, 'utf8'),
        /from\s+['"](?:@ark-ui\/|@zag-js\/|\$lib\/|@spark-ui\/|@spark\/)/,
      )
    }
    assert.ok(!fs.existsSync(themeDir))
    await run(process.execPath, [
      cli,
      'add',
      `${process.env.REGISTRY_BASE_URL}/${framework}/spark-theme-default.json`,
      '--cwd',
      dir,
      '--yes',
      ...(framework === 'svelte' ? ['--no-deps-install', '--skip-preflight'] : []),
    ])
    assert.equal(fs.readFileSync(path.join(dir, 'src/app.css'), 'utf8'), globalStyles)
    assert.ok(fs.existsSync(path.join(themeDir, 'index.css')))
    assert.ok(fs.existsSync(path.join(themeDir, 'components/fieldset.css')))
    const tokensFile = path.join(themeDir, 'tokens.css')
    const originalTokens = fs.readFileSync(tokensFile, 'utf8')
    const customizedTokens = originalTokens + '\n/* project customization */\n'
    fs.writeFileSync(tokensFile, customizedTokens)
    await run(process.execPath, [
      cli,
      'add',
      urls[0]!,
      '--cwd',
      dir,
      '--yes',
      '--overwrite',
      ...(framework === 'svelte' ? ['--no-deps-install', '--skip-preflight'] : []),
    ])
    assert.equal(
      fs.readFileSync(tokensFile, 'utf8'),
      customizedTokens,
      'Component reinstalls preserve customized themes',
    )
    fs.writeFileSync(tokensFile, originalTokens)
    assert.equal(fs.readFileSync(path.join(dir, 'src/project-theme.css'), 'utf8'), override)
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    assert.ok(
      !Object.keys(manifest.dependencies).some(
        (name) => name.startsWith('@ark-ui/') || name.startsWith('@zag-js/'),
      ),
    )
    const selectItems = JSON.stringify(
      Array.from({ length: 30 }, (_, index) => ({
        value: `option-${index + 1}`,
        label: `Option ${index + 1}`,
      })),
    )
    if (framework === 'react') {
      write(
        dir,
        'src/App.tsx',
        `import './app.css'; import custom from './custom.module.css'; import { useState } from 'react'; import { Button } from './components/ui/button/index'; import { Checkbox } from './components/ui/checkbox/index'; import { Field } from './components/ui/field/index'; import { Dialog } from './components/ui/dialog/index'; import { Popover } from './components/ui/popover/index'; import { DatePicker } from './components/ui/date-picker/index'; import { Select } from './components/ui/select/index'; import { LocaleProvider } from './components/ui/locale/index'; import { EnvironmentProvider } from './components/ui/environment/index';
export default function App(){const [count,setCount]=useState(0);return <EnvironmentProvider><Button parts={{button:{variant:"secondary",size:"lg",className:custom.custom,ref:(node)=>{if(node) node.dataset.refReady="true"},onClick:()=>setCount(count+1)}}}>Native clicks {count}</Button><Button parts={{button:{disabled:true}}}>Native disabled</Button><LocaleProvider locale="ar"><Field.Root invalid><Field.Label>Preferences</Field.Label><Checkbox label="Accept terms" parts={{root:{name:"terms"}}}/><Field.ErrorText>Required choice</Field.ErrorText></Field.Root><Field label="Email" helperText="Use your work email." errorText="Enter a valid email." parts={{root:{invalid:true},input:{type:"email",name:"email"}}}/><Dialog title="Settings" description="Settings dialog"><Popover title="Details" description="Details popup" parts={{content:{className:"custom-popover"}}}><button>Inner action</button></Popover></Dialog><DatePicker label="Appointment"/><Select label="Long list" items={${selectItems}}/><button>Outside action</button></LocaleProvider></EnvironmentProvider>}`,
      )
      write(
        dir,
        'src/client.tsx',
        `import {hydrateRoot} from 'react-dom/client';import App from './App';hydrateRoot(document.getElementById('app')!,<App/>);`,
      )
      write(
        dir,
        'src/ssr.tsx',
        `import {renderToString} from 'react-dom/server';import App from './App';export const html=renderToString(<App/>);`,
      )
    } else {
      write(
        dir,
        'src/App.svelte',
        `<script lang="ts">import './app.css'; import custom from './custom.module.css'; import { Button } from './components/ui/button/index'; import { Checkbox } from './components/ui/checkbox/index'; import { Field } from './components/ui/field/index'; import { Dialog } from './components/ui/dialog/index'; import { Popover } from './components/ui/popover/index'; import { DatePicker } from './components/ui/date-picker/index'; import { Select } from './components/ui/select/index'; import { LocaleProvider } from './components/ui/locale/index'; import { EnvironmentProvider } from './components/ui/environment/index';let count=$state(0);let buttonRef=$state<HTMLButtonElement|null>(null);$effect(()=>{if(buttonRef) buttonRef.dataset.refReady='true'});</script>
<EnvironmentProvider><Button.Root variant="secondary" size="lg" class={custom.custom} bind:ref={buttonRef} onclick={()=>count++}>Native clicks {count}</Button.Root><Button parts={{button:{disabled:true}}}>Native disabled</Button><LocaleProvider locale="ar"><Field.Root invalid><Field.Label>Preferences</Field.Label><Checkbox parts={{root:{name:'terms'}}}>{#snippet label()}Accept terms{/snippet}</Checkbox><Field.ErrorText>Required choice</Field.ErrorText></Field.Root><Field parts={{root:{invalid:true},input:{type:'email',name:'email'}}}>{#snippet label()}Email{/snippet}{#snippet helperText()}Use your work email.{/snippet}{#snippet errorText()}Enter a valid email.{/snippet}</Field><Dialog>{#snippet title()}Settings{/snippet}{#snippet description()}Settings dialog{/snippet}<Popover parts={{content:{class:'custom-popover'}}}>{#snippet title()}Details{/snippet}{#snippet description()}Details popup{/snippet}<button>Inner action</button></Popover></Dialog><DatePicker>{#snippet label()}Appointment{/snippet}</DatePicker><Select items={${selectItems}}>{#snippet label()}Long list{/snippet}</Select><button>Outside action</button></LocaleProvider></EnvironmentProvider>`,
      )
      write(
        dir,
        'src/client.ts',
        `import {hydrate} from 'svelte';import App from './App.svelte';hydrate(App,{target:document.getElementById('app')!});`,
      )
      write(
        dir,
        'src/ssr.ts',
        `import {render} from 'svelte/server';import App from './App.svelte';export const html=render(App).body;`,
      )
    }
    assert.ok(!manifest.dependencies.tailwindcss && !manifest.dependencies['tailwind-merge'])
    if (framework === 'react')
      await run(
        process.execPath,
        [path.join(dir, 'node_modules/typescript/bin/tsc'), '-p', path.join(dir, 'tsconfig.json')],
        dir,
      )
    if (framework === 'svelte')
      await run(
        process.execPath,
        [
          path.join(dir, 'node_modules/svelte-check/bin/svelte-check'),
          '--tsconfig',
          './tsconfig.json',
        ],
        dir,
      )
    write(
      dir,
      'index.html',
      `<html><body><div id="app"></div><script type="module" src="/src/client.${framework === 'react' ? 'tsx' : 'ts'}"></script></body></html>`,
    )
    await run(process.execPath, [path.join(dir, 'node_modules/vite/bin/vite.js'), 'build'], dir)
    const assets = path.join(dir, 'dist/assets')
    const css = fs
      .readdirSync(assets)
      .filter((file) => file.endsWith('.css'))
      .map((file) => fs.readFileSync(path.join(assets, file), 'utf8'))
      .join('')
    assert.match(css, /spark-dialog-positioner/)
    assert.doesNotMatch(
      css,
      /spark-button-secondary|--color-background-action:|spark-fieldset-root/,
    )
    assert.match(css, /--fixture-large-row:3rem/)
    assert.doesNotMatch(css, /@theme|@apply/)
    console.log(`Registry installation, import isolation, and type checks passed: ${framework}`)
  }
} finally {
  server.close()
  delete process.env.REGISTRY_BASE_URL
  buildRegistry()
}
