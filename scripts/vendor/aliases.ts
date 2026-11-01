import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export type Paths = Record<string, string[]>
const prefix = '@spark/'
const source = /^packages\/([^/]+)\/src\/(.+)$/

export function relative(from: string, to: string) {
  const value = path.posix.relative(path.posix.dirname(from), to)
  return value.startsWith('.') ? value : `./${value}`
}

export function sourceImport(from: string, to: string) {
  const owner = source.exec(from)
  const target = source.exec(to)
  if (!owner || !target) throw new Error(`Source outside component src: ${from} -> ${to}`)
  return owner[1] === target[1] ? relative(from, to) : `${prefix}${target[1]}/${target[2]}`
}

export function resolveSourceImport(file: string, specifier: string, paths: Paths) {
  if (specifier.startsWith('.'))
    return path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
  if (!specifier.startsWith(prefix)) return undefined
  const match = /^@spark\/([^/]+)\/(.+)$/.exec(specifier)
  if (!match) throw new Error(`Invalid Spark alias in ${file}: ${specifier}`)
  const [, name, suffix] = match
  const pattern = `${prefix}${name}/*`
  const expected = `./packages/${name}/src/*`
  if (paths[pattern]?.length !== 1 || paths[pattern]?.[0] !== expected)
    throw new Error(`Missing or invalid Spark alias ${pattern}; run pnpm aliases:sync`)
  const root = `packages/${name}/src/`
  const target = path.posix.normalize(`${root}${suffix}`)
  if (!target.startsWith(root) || suffix!.split('/').includes('..'))
    throw new Error(`Invalid Spark alias in ${file}: ${specifier}`)
  return target
}

export function expectedAliases(root: string): Paths {
  return Object.fromEntries(
    fs
      .readdirSync(path.join(root, 'packages'), { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          fs
            .statSync(path.join(root, 'packages', entry.name, 'src'), { throwIfNoEntry: false })
            ?.isDirectory(),
      )
      .map((entry) => entry.name)
      .sort()
      .map((name) => [`${prefix}${name}/*`, [`./packages/${name}/src/*`]]),
  )
}

export function syncAliases(root: string, check = false) {
  const file = path.join(root, 'tsconfig.json')
  const config = JSON.parse(fs.readFileSync(file, 'utf8'))
  const paths: Paths = config.compilerOptions?.paths ?? {}
  const expected = expectedAliases(root)
  const existing = Object.keys(paths).filter((key) => key.startsWith(prefix))
  const matches =
    existing.length === Object.keys(expected).length &&
    existing.every((key) => JSON.stringify(paths[key]) === JSON.stringify(expected[key]))
  if (check && !matches) throw new Error('Spark aliases are stale; run pnpm aliases:sync')
  if (!check && !matches) {
    config.compilerOptions ??= {}
    config.compilerOptions.paths = {
      ...Object.fromEntries(Object.entries(paths).filter(([key]) => !key.startsWith(prefix))),
      ...expected,
    }
    fs.writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`)
  }
  return config.compilerOptions?.paths ?? {}
}

// Use the same mappings in Vite, including files outside the root tsconfig's include.
export function viteAliases(paths: Paths, root: string) {
  return Object.entries(paths)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, values]) => {
      const name = /^@spark\/([^/]+)\/\*$/.exec(key)?.[1]
      if (!name || values.length !== 1 || values[0] !== `./packages/${name}/src/*`)
        throw new Error(`Invalid Spark alias ${key}; run pnpm aliases:sync`)
      return {
        find: `${prefix}${name}`,
        replacement: path.resolve(root, values[0].slice(0, -2)),
      }
    })
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const command = process.argv[2]
    if (command !== 'sync' && command !== 'check') throw new Error('Usage: aliases.ts sync | check')
    syncAliases(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'),
      command === 'check',
    )
    console.log(command === 'check' ? 'Spark aliases verified' : 'Spark aliases synchronized')
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
