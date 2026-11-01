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
      stdio: 'inherit',
      env: { ...process.env, CI: 'true', npm_config_ignore_workspace: 'true' },
    })
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
      tailwindcss: '4.3.3',
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
    write(dir, 'src/app.css', '@import "tailwindcss";\n')
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
    const names = ['checkbox', 'field', 'dialog', 'popover', 'locale', 'environment']
    const urls = names.map(
      (name) => `${process.env.REGISTRY_BASE_URL}/${framework}/${name}-${framework}.json`,
    )
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
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    assert.ok(
      !Object.keys(manifest.dependencies).some(
        (name) => name.startsWith('@ark-ui/') || name.startsWith('@zag-js/'),
      ),
    )
    if (framework === 'react') {
      write(
        dir,
        'src/App.tsx',
        `import { Checkbox } from './components/ui/checkbox/index'; import { Field } from './components/ui/field/index'; import { Dialog } from './components/ui/dialog/index'; import { Popover } from './components/ui/popover/index'; import { LocaleProvider } from './components/ui/locale/index'; import { EnvironmentProvider } from './components/ui/environment/index';
export default function App(){return <EnvironmentProvider><LocaleProvider locale="ar"><Field.Root invalid><Field.Label>Preferences</Field.Label><Checkbox.Root><Checkbox.HiddenInput/><Checkbox.Control/><Checkbox.Label>Accept terms</Checkbox.Label></Checkbox.Root><Field.ErrorText>Required choice</Field.ErrorText></Field.Root><Dialog.Root><Dialog.Trigger>Open dialog</Dialog.Trigger><Dialog.Backdrop/><Dialog.Positioner><Dialog.Content><Dialog.Title>Settings</Dialog.Title><Dialog.Description>Settings dialog</Dialog.Description><Popover.Root><Popover.Trigger>Open popover</Popover.Trigger><Popover.Positioner><Popover.Content><Popover.Title>Details</Popover.Title><Popover.Description>Details popup</Popover.Description><button>Inner action</button></Popover.Content></Popover.Positioner></Popover.Root><Dialog.CloseTrigger>Close dialog</Dialog.CloseTrigger></Dialog.Content></Dialog.Positioner></Dialog.Root><button>Outside action</button></LocaleProvider></EnvironmentProvider>}`,
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
        `<script lang="ts">import { Checkbox } from './components/ui/checkbox/index'; import { Field } from './components/ui/field/index'; import { Dialog } from './components/ui/dialog/index'; import { Popover } from './components/ui/popover/index'; import { LocaleProvider } from './components/ui/locale/index'; import { EnvironmentProvider } from './components/ui/environment/index';</script>
<EnvironmentProvider><LocaleProvider locale="ar"><Field.Root invalid><Field.Label>Preferences</Field.Label><Checkbox.Root><Checkbox.HiddenInput/><Checkbox.Control/><Checkbox.Label>Accept terms</Checkbox.Label></Checkbox.Root><Field.ErrorText>Required choice</Field.ErrorText></Field.Root><Dialog.Root><Dialog.Trigger>Open dialog</Dialog.Trigger><Dialog.Backdrop/><Dialog.Positioner><Dialog.Content><Dialog.Title>Settings</Dialog.Title><Dialog.Description>Settings dialog</Dialog.Description><Popover.Root><Popover.Trigger>Open popover</Popover.Trigger><Popover.Positioner><Popover.Content><Popover.Title>Details</Popover.Title><Popover.Description>Details popup</Popover.Description><button>Inner action</button></Popover.Content></Popover.Positioner></Popover.Root><Dialog.CloseTrigger>Close dialog</Dialog.CloseTrigger></Dialog.Content></Dialog.Positioner></Dialog.Root><button>Outside action</button></LocaleProvider></EnvironmentProvider>`,
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
    console.log(`Registry installation, import isolation, and type checks passed: ${framework}`)
  }
} finally {
  server.close()
  delete process.env.REGISTRY_BASE_URL
  buildRegistry()
}
