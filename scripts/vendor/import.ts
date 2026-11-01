import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import semver from 'semver'
import { resolveSourceImport, syncAliases } from './aliases.ts'
import {
  Graph,
  Snapshot,
  frameworkRoot,
  hash,
  key,
  relative,
  rewriteModules,
  type Framework,
} from './graph.ts'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const lockPath = 'vendor.lock.json'
export const json = (file: string) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
export const write = (file: string, content: string) => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
  fs.writeFileSync(path.join(root, file), content)
}
export const stringify = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`
export function constraints(values: string[]) {
  let sets = ['*']
  for (const value of [...new Set(values)].sort()) {
    const next = new semver.Range(value).set.map((set) => set.map((c) => c.value).join(' ') || '*')
    sets = sets
      .flatMap((a) => next.map((b) => `${a} ${b}`))
      .filter((range) => {
        const min = semver.minVersion(range)
        return min && semver.satisfies(min, range)
      })
  }
  if (!sets.length) throw new Error(`Incompatible external ranges: ${values.join(', ')}`)
  return new semver.Range(sets.join(' || ')).range || '*'
}
export async function generate(
  names: string[],
  options: { ark?: string; zag?: string; apply?: boolean; baseline?: boolean } = {},
) {
  const old = fs.existsSync(path.join(root, lockPath)) ? json(lockPath) : undefined
  const components = [...new Set([...(old?.components ?? []), ...names])].sort() as string[]
  if (
    !components.length ||
    components.some((name) => !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name))
  )
    throw new Error('Provide valid lowercase component names')
  const ark = new Snapshot(
    path.resolve(root, process.env.ARK_SOURCE ?? '../ark'),
    options.ark ?? old?.upstream.ark.commit ?? 'HEAD',
  )
  const zag = new Snapshot(
    path.resolve(root, process.env.ZAG_SOURCE ?? '../zag'),
    options.zag ?? old?.upstream.zag.commit ?? 'HEAD',
  )
  if (
    old &&
    !options.baseline &&
    (old.upstream.ark.commit !== ark.commit || old.upstream.zag.commit !== zag.commit)
  )
    throw new Error('Use update-upstream to advance upstream revisions')
  const graph = new Graph(ark, zag)
  const entries: Record<
    string,
    {
      component: string
      framework: Framework
      root: string
      files: string[]
      dependencies: string[]
    }
  > = {}
  for (const component of components)
    for (const framework of ['react', 'svelte'] as const) {
      const file = [
        `${frameworkRoot(framework)}/components/${component}/index.ts`,
        `${frameworkRoot(framework)}/providers/${component}/index.ts`,
      ].find((file) => ark.files.has(file))
      if (!file) {
        console.error(`No ${framework} implementation for ${component} at ${ark.commit}`)
        continue
      }
      const id = graph.visit({ repo: 'ark', file })
      entries[`${component}-${framework}`] = {
        component,
        framework,
        root: id,
        files: graph.closure(id),
        dependencies: [],
      }
    }
  for (const name of names)
    if (!Object.values(entries).some((e) => e.component === name))
      throw new Error(
        `No upstream implementation found for ${name}; existing native components are not replaced`,
      )
  for (const entry of Object.values(entries)) {
    const external: Record<string, string[]> = {}
    for (const id of entry.files)
      for (const [name, range] of Object.entries(graph.nodes.get(id)!.external))
        (external[name] ??= []).push(range)
    entry.dependencies = Object.entries(external)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, ranges]) => `${name}@${constraints(ranges)}`)
  }
  const output = new Map<string, string>()
  const files: Record<string, any> = {}
  for (const [id, node] of [...graph.nodes].sort(([a], [b]) => a.localeCompare(b))) {
    output.set(node.destination, node.content)
    files[id] = {
      destination: node.destination,
      upstreamHash: hash(graph.snapshots[node.source.repo].read(node.source.file)),
      generatedHash: hash(node.content),
      dependencies: node.dependencies,
      external: node.external,
    }
  }
  for (const repo of ['ark', 'zag'] as const)
    output.set(
      `packages/shared/src/licenses/${repo}-LICENSE`,
      graph.snapshots[repo].read('LICENSE'),
    )
  const starters: Record<string, string> = {}
  for (const { component, framework, root: entryRoot } of Object.values(entries)) {
    const file = `packages/${component}/src/${framework === 'react' ? 'react.tsx' : 'svelte.ts'}`
    starters[file] =
      `${framework === 'react' ? "'use client'\n\n" : ''}// Customize this public API and compose wrappers here. Implementation sources are editable.\nimport './styles.css'\nexport * from '${relative(file, graph.nodes.get(entryRoot)!.destination)}'\n`
    starters[`packages/${component}/src/styles.css`] =
      `/* ${component}: add styles using Ark's data-scope and data-part attributes. */\n`
  }
  const manifest = {
    version: 1,
    importerVersion: 2,
    upstream: {
      ark: { commit: ark.commit, version: graph.packages.get('@ark-ui/react')!.manifest.version },
      zag: { commit: zag.commit, version: graph.packages.get('@zag-js/core')!.manifest.version },
    },
    components,
    entries,
    files,
    starters: Object.keys(starters).sort(),
  }
  // Refuse destructive regeneration of customization. Baseline regeneration is explicitly isolated.
  const removed: string[] = []
  for (const oldFile of Object.values(old?.files ?? {}) as any[]) {
    const absolute = path.join(root, oldFile.destination)
    if (!options.baseline && output.has(oldFile.destination) && !fs.existsSync(absolute))
      throw new Error(
        `Locally deleted source ${oldFile.destination}; use the upstream merge workflow`,
      )
    if (
      fs.existsSync(absolute) &&
      hash(fs.readFileSync(absolute, 'utf8')) !== oldFile.generatedHash &&
      !options.baseline &&
      output.get(oldFile.destination) !== fs.readFileSync(absolute, 'utf8')
    )
      throw new Error(
        `Local customization in ${oldFile.destination}; use the upstream merge workflow`,
      )
    if (!output.has(oldFile.destination)) removed.push(oldFile.destination)
  }
  for (const [file, content] of output)
    if (
      !Object.values(old?.files ?? {}).some((owned: any) => owned.destination === file) &&
      !file.includes('/licenses/') &&
      fs.existsSync(path.join(root, file)) &&
      fs.readFileSync(path.join(root, file), 'utf8') !== content
    )
      throw new Error(`Refusing to replace existing file ${file}`)
  const changed = [...output]
    .filter(
      ([file, content]) =>
        !fs.existsSync(path.join(root, file)) ||
        fs.readFileSync(path.join(root, file), 'utf8') !== content,
    )
    .map(([file]) => file)
  const report = {
    components,
    commits: manifest.upstream,
    files: output.size,
    shared: [...output.keys()].filter((p) => p.startsWith('packages/shared/')).length,
    changed,
    removed,
    dependencies: Object.fromEntries(
      Object.entries(entries).map(([name, e]) => [name, e.dependencies]),
    ),
  }
  console.log(stringify(report))
  if (!options.apply) return manifest
  for (const [file, content] of output) write(file, content)
  for (const file of removed) fs.rmSync(path.join(root, file), { force: true })
  for (const [file, content] of Object.entries(starters))
    if (!fs.existsSync(path.join(root, file))) write(file, content)
  syncAliases(root)
  write(lockPath, stringify(manifest))
  return manifest
}

export function installed(file: string) {
  const result = file.replace(
    /^packages\/([^/]+)\/src\//,
    (_, name) => `${name === 'shared' ? '_spark' : name}/`,
  )
  return result.replace(/\/react\.tsx$/, '/index.tsx').replace(/\/svelte\.ts$/, '/index.ts')
}
export function buildRegistry() {
  if (!fs.existsSync(path.join(root, lockPath))) return
  const lock = json(lockPath)
  const paths = syncAliases(root, true)
  const sourceFiles = Object.values(lock.files).map((f: any) => f.destination) as string[]
  const licenses = [
    'packages/shared/src/licenses/ark-LICENSE',
    'packages/shared/src/licenses/zag-LICENSE',
  ]
  const native = json('registry.json').items.filter(
    (item: any) => item.meta?.framework === 'react' || item.meta?.framework === 'svelte',
  ) as any[]
  const all = [
    ...new Set([
      ...sourceFiles,
      ...lock.starters,
      ...licenses,
      ...native.flatMap((item) => item.files.map((file: any) => file.path)),
    ]),
  ].sort()
  const release = hash(
    JSON.stringify(lock) +
      '\0registry-v4\0' +
      JSON.stringify(native) +
      (process.env.REGISTRY_BASE_URL ?? 'http://localhost:5173/r') +
      '\0' +
      all.map((file) => `${file}\0${fs.readFileSync(path.join(root, file), 'utf8')}`).join('\0'),
  ).slice(0, 20)
  const base = (process.env.REGISTRY_BASE_URL ?? 'http://localhost:5173/r').replace(/\/$/, '')
  if (!/^https?:\/\//.test(base))
    throw new Error('REGISTRY_BASE_URL must be an absolute HTTP(S) URL')
  const sourceName = (id: string) => `source-${hash(id).slice(0, 20)}`
  const fileEntry = (file: string, framework = 'react') => ({
    path: file,
    type: framework === 'react' ? 'registry:file' : 'registry:ui',
    target: framework === 'react' ? `@ui/${installed(file)}` : installed(file),
    content: rewriteModules(file, fs.readFileSync(path.join(root, file), 'utf8'), (specifier) => {
      const target = resolveSourceImport(file, specifier, paths)
      if (target === undefined) return specifier
      if (!all.includes(target))
        throw new Error(`Unresolved installed source ${file}: ${specifier}`)
      return relative(installed(file), installed(target))
    }),
  })
  for (const framework of ['react', 'svelte']) {
    const schema =
      framework === 'react' ? 'https://ui.shadcn.com/schema' : 'https://shadcn-svelte.com/schema'
    const items: any[] = []
    const reachable = new Set<string>(
      Object.values(lock.entries)
        .filter((e: any) => e.framework === framework)
        .flatMap((e: any) => e.files),
    )
    for (const id of [...reachable].sort())
      items.push({
        name: sourceName(id),
        type: 'registry:lib',
        files: [fileEntry(lock.files[id].destination, framework)],
      })
    items.push({
      name: 'upstream-licenses',
      type: 'registry:lib',
      files: licenses.map((file) => fileEntry(file, framework)),
    })
    for (const [name, entry] of Object.entries(lock.entries) as [string, any][]) {
      if (entry.framework !== framework) continue
      const starter = `packages/${entry.component}/src/${framework === 'react' ? 'react.tsx' : 'svelte.ts'}`
      items.push({
        name,
        type: 'registry:ui',
        title: `${entry.component} (${framework})`,
        devDependencies: [
          '@types/node@^26.6.6',
          ...(framework === 'react' ? ['@types/react@^19.3.0', '@types/react-dom@^19.0.0'] : []),
        ],
        dependencies: entry.dependencies,
        registryDependencies: [
          ...entry.files.map((id: string) => sourceName(id)),
          'upstream-licenses',
        ].map((item) => `${base}/${release}/${framework}/${item}.json`),
        files: [
          fileEntry(starter, framework),
          fileEntry(`packages/${entry.component}/src/styles.css`, framework),
        ],
      })
    }
    items.push(
      ...native
        .filter((item) => item.meta.framework === framework)
        .map(({ files, ...item }) => ({
          ...item,
          files: files.map((file: any) => fileEntry(file.path, framework)),
        })),
    )
    if (framework === 'react') {
      const catalog = json('registry.json')
      const generatedNames = new Set(Object.keys(lock.entries))
      const generated = items
        .filter((item) => generatedNames.has(item.name))
        .map(({ files, ...item }) => ({
          ...item,
          files: files.map(({ content, ...file }: any) => file),
        }))
      catalog.items = [
        ...catalog.items.filter((item: any) => !generatedNames.has(item.name)),
        ...generated,
      ]
      write('registry.json', stringify(catalog))
    }
    const registry = {
      $schema: `${schema}/registry.json`,
      name: `spark-ui-${framework}`,
      homepage: base.replace(/\/r$/, ''),
      items: items.map(({ files, ...item }) => ({
        ...item,
        files: files.map(({ content, ...file }: any) => file),
      })),
    }
    write(`registry.${framework}.json`, stringify(registry))
    for (const item of items) {
      const content = stringify({ $schema: `${schema}/registry-item.json`, ...item })
      write(`public/r/${release}/${framework}/${item.name}.json`, content)
      if (!item.name.startsWith('source-')) {
        write(`public/r/${framework}/${item.name}.json`, content)
        if (item.name !== 'upstream-licenses') write(`public/r/${item.name}.json`, content)
      }
    }
  }
  console.log(`Built React and Svelte registry release ${release}`)
}
export function verify() {
  const lock = json(lockPath)
  const paths = syncAliases(root, true)
  const files = new Set<string>([
    ...Object.values(lock.files).map((f: any) => f.destination),
    ...lock.starters,
  ])
  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file), 'utf8')
    rewriteModules(file, content, (specifier) => {
      if (/^(@ark-ui\/|@zag-js\/|\$lib\/|@spark-ui\/)/.test(specifier))
        throw new Error(`Unvendored import ${file}: ${specifier}`)
      const target = resolveSourceImport(file, specifier, paths)
      if (target !== undefined) {
        if (!files.has(target)) throw new Error(`Unresolved import ${file}: ${specifier}`)
        if (file.includes('/common/') && /\/(react|svelte)\//.test(target))
          throw new Error(`Framework dependency in common source: ${file}`)
      } else if (file.includes('/common/') && /^(react|react-dom|svelte)(\/|$)/.test(specifier))
        throw new Error(`Framework dependency in common source: ${file}`)
      return specifier
    })
  }
  console.log(`Verified ${files.size} editable source files`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, ...args] = process.argv.slice(2)
    if (command === 'import')
      await generate(
        args.filter((a) => !a.startsWith('--')),
        { apply: args.includes('--apply') },
      )
    else if (command === 'registry') buildRegistry()
    else if (command === 'verify') verify()
    else throw new Error('Usage: import.ts import <component> [--apply] | registry | verify')
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
