import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { createHash } from 'node:crypto'
import ts from 'typescript-parser'
import semver from 'semver'
import { parse } from 'svelte/compiler'
import { relative, sourceImport } from './aliases.ts'
export { relative } from './aliases.ts'

export const hash = (value: string) => createHash('sha256').update(value).digest('hex')
export const slash = (value: string) => value.split(path.sep).join('/')
export const git = (cwd: string, ...args: string[]) =>
  execFileSync('git', ['-C', cwd, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }).trimEnd()
export type Framework = 'react' | 'svelte'
export type Source = { repo: 'ark' | 'zag'; file: string }
export const key = (s: Source) => `${s.repo}:${s.file}`
export const splitKey = (s: string): Source => ({
  repo: s.slice(0, s.indexOf(':')) as Source['repo'],
  file: s.slice(s.indexOf(':') + 1),
})
export const frameworkRoot = (framework: Framework) =>
  `packages/${framework}/src${framework === 'svelte' ? '/lib' : ''}`

export class Snapshot {
  root: string
  commit: string
  files: Set<string>
  cache = new Map<string, string>()
  constructor(root: string, ref: string) {
    this.root = root
    if (git(root, 'status', '--porcelain', '--untracked-files=no'))
      throw new Error(`Upstream has uncommitted tracked changes: ${root}`)
    this.commit = git(root, 'rev-parse', '--verify', `${ref}^{commit}`)
    this.files = new Set(git(root, 'ls-tree', '-r', '--name-only', this.commit).split('\n'))
  }
  read(file: string) {
    if (!this.files.has(file)) throw new Error(`Missing committed source: ${file}`)
    if (!this.cache.has(file))
      this.cache.set(
        file,
        execFileSync('git', ['-C', this.root, 'show', `${this.commit}:${file}`], {
          encoding: 'utf8',
          maxBuffer: 16 * 1024 * 1024,
        }),
      )
    return this.cache.get(file)!
  }
  resolve(file: string) {
    const normalized = path.posix.normalize(file)
    if (this.files.has(normalized)) return normalized
    const base = normalized.replace(/\.js$/, '')
    const matches = ['.ts', '.tsx', '.svelte', '/index.ts', '/index.tsx']
      .map((ext) => base + ext)
      .filter((p) => this.files.has(p))
    if (matches.length !== 1)
      throw new Error(`Cannot uniquely resolve ${file}: ${matches.join(', ')}`)
    return matches[0]!
  }
}

// Parse Svelte with its compiler; parse each script with TypeScript to retain TS syntax.
export function scripts(file: string, content: string) {
  if (!file.endsWith('.svelte'))
    return [
      {
        offset: 0,
        ast: ts.createSourceFile(
          file,
          content,
          ts.ScriptTarget.Latest,
          true,
          file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
        ),
      },
    ]
  const ast = parse(content, { modern: true })
  return [ast.module, ast.instance].filter(Boolean).map((script: any) => {
    const offset = script.content.start
    return {
      offset,
      ast: ts.createSourceFile(
        `${file}.ts`,
        content.slice(offset, script.content.end),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
      ),
    }
  })
}
export function rewriteModules(
  file: string,
  content: string,
  resolve: (specifier: string) => string,
): string {
  const edits: { start: number; end: number; text: string }[] = []
  for (const { offset, ast } of scripts(file, content)) {
    function visit(node: ts.Node) {
      let literal: ts.StringLiteralLike | undefined
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteralLike(node.moduleSpecifier)
      )
        literal = node.moduleSpecifier
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteralLike(node.argument.literal)
      )
        literal = node.argument.literal
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
      ) {
        if (!node.arguments[0] || !ts.isStringLiteralLike(node.arguments[0]))
          throw new Error(`Non-literal module reference in ${file}`)
        literal = node.arguments[0]
      }
      if (ts.isExternalModuleReference(node)) {
        if (!node.expression || !ts.isStringLiteralLike(node.expression))
          throw new Error(`Non-literal require in ${file}`)
        literal = node.expression
      }
      if (literal)
        edits.push({
          start: offset + literal.getStart(ast) + 1,
          end: offset + literal.end - 1,
          text: resolve(literal.text),
        })
      ts.forEachChild(node, visit)
    }
    visit(ast)
  }
  return edits
    .sort((a, b) => b.start - a.start)
    .reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), content)
}

export class Graph {
  snapshots: Record<'ark' | 'zag', Snapshot>
  packages = new Map<string, { repo: 'ark' | 'zag'; dir: string; manifest: any }>()
  nodes = new Map<
    string,
    {
      source: Source
      destination: string
      content: string
      dependencies: string[]
      external: Record<string, string>
    }
  >()
  constructor(ark: Snapshot, zag: Snapshot) {
    this.snapshots = { ark, zag }
    for (const repo of ['ark', 'zag'] as const) {
      for (const file of [...this.snapshots[repo].files].sort()) {
        if (!file.startsWith('packages/') || !file.endsWith('/package.json')) continue
        const manifest = JSON.parse(this.snapshots[repo].read(file))
        if (manifest.name?.startsWith(repo === 'ark' ? '@ark-ui/' : '@zag-js/'))
          this.packages.set(manifest.name, { repo, dir: path.posix.dirname(file), manifest })
      }
    }
  }
  resolve(source: Source, specifier: string): Source | undefined {
    if (specifier.startsWith('.'))
      return {
        repo: source.repo,
        file: this.snapshots[source.repo].resolve(
          path.posix.join(path.posix.dirname(source.file), specifier),
        ),
      }
    if (specifier.startsWith('$lib/'))
      return {
        repo: 'ark',
        file: this.snapshots.ark.resolve(`${frameworkRoot('svelte')}/${specifier.slice(5)}`),
      }
    if (!specifier.startsWith('@zag-js/') && !specifier.startsWith('@ark-ui/')) return undefined
    const [scope, name, ...rest] = specifier.split('/')
    const pkg = this.packages.get(`${scope}/${name}`)
    if (!pkg) throw new Error(`Unknown upstream package ${specifier}`)
    if (source.repo === 'ark' && pkg.repo === 'zag') {
      const owner = this.packages.get(`@ark-ui/${source.file.split('/')[1]}`)
      const expected = owner?.manifest.dependencies?.[pkg.manifest.name]
      if (!expected || !semver.satisfies(pkg.manifest.version, expected)) {
        throw new Error(
          `Incompatible upstream pair: ${owner?.manifest.name} requires ${pkg.manifest.name}@${expected}, got ${pkg.manifest.version}`,
        )
      }
    }
    const subpath = rest.length ? `./${rest.join('/')}` : '.'
    let entry = pkg.manifest.exports
    if (entry && typeof entry === 'object' && Object.keys(entry).some((k) => k.startsWith('.'))) {
      const wildcard = Object.keys(entry).find(
        (k) =>
          k.includes('*') &&
          subpath.startsWith(k.split('*')[0]!) &&
          subpath.endsWith(k.split('*')[1]!),
      )
      entry =
        entry[subpath] ??
        (wildcard
          ? JSON.parse(
              JSON.stringify(entry[wildcard]).replaceAll(
                '*',
                subpath.slice(
                  wildcard.indexOf('*'),
                  wildcard.endsWith('*') ? undefined : -wildcard.split('*')[1]!.length,
                ),
              ),
            )
          : undefined)
    }
    while (entry && typeof entry === 'object')
      entry = entry.source ?? entry.svelte ?? entry.import ?? entry.default ?? entry.types
    entry ??= rest.length ? undefined : pkg.manifest.main
    if (typeof entry !== 'string') throw new Error(`No source export for ${specifier}`)
    return {
      repo: pkg.repo,
      file: this.snapshots[pkg.repo].resolve(path.posix.join(pkg.dir, entry)),
    }
  }
  destination(source: Source) {
    if (source.repo === 'ark') {
      const framework = source.file.split('/')[1] as Framework
      if (!['react', 'svelte'].includes(framework))
        throw new Error(`Unsupported architecture: ${source.file}`)
      const file = path.posix.relative(frameworkRoot(framework), source.file)
      if (file.startsWith('../')) throw new Error(`Source outside framework root: ${source.file}`)
      const match = /^components\/([^/]+)\/(.+)$/.exec(file)
      if (match && match[1] !== 'factory')
        return `packages/${match[1]}/src/${framework}/ark/${match[2]}`
      return `packages/shared/src/${framework}/ark/${file}`
    }
    const pkg = [...this.packages.values()]
      .filter((p) => p.repo === 'zag' && source.file.startsWith(`${p.dir}/`))
      .sort((a, b) => b.dir.length - a.dir.length)[0]
    if (!pkg) throw new Error(`No owner for ${key(source)}`)
    const name = pkg.manifest.name.slice('@zag-js/'.length)
    const file = path.posix.relative(`${pkg.dir}/src`, source.file)
    if (file.startsWith('../')) throw new Error(`Source outside package src: ${source.file}`)
    if (pkg.dir.startsWith('packages/frameworks/')) return `packages/shared/src/${name}/zag/${file}`
    if (pkg.dir.startsWith('packages/machines/'))
      return `packages/${name}/src/common/zag/${name}/${file}`
    return `packages/shared/src/common/zag/${name}/${file}`
  }
  // Follow only pure re-export barrels. Never remove a module with executable statements.
  binding(
    source: Source,
    name: string,
    seen = new Set<string>(),
  ): { source: Source; name: string } {
    const owner = [...this.packages.values()]
      .filter((p) => p.repo === source.repo && source.file.startsWith(`${p.dir}/`))
      .sort((a, b) => b.dir.length - a.dir.length)[0]
    if (owner?.manifest.sideEffects !== false) return { source, name }
    const id = `${key(source)}#${name}`
    if (seen.has(id) || source.file.endsWith('.svelte')) return { source, name }
    seen = new Set([...seen, id])
    const text = this.snapshots[source.repo].read(source.file)
    const ast = scripts(source.file, text)[0]!.ast
    if (
      !ast.statements.length ||
      !ast.statements.every((s) => ts.isExportDeclaration(s) && s.moduleSpecifier)
    )
      return { source, name }
    for (const statement of ast.statements) {
      const exp = statement as ts.ExportDeclaration
      if (exp.exportClause && ts.isNamedExports(exp.exportClause)) {
        const element = exp.exportClause.elements.find((e) => e.name.text === name)
        if (element) {
          const target = this.resolve(source, (exp.moduleSpecifier as ts.StringLiteral).text)
          return target
            ? this.binding(target, element.propertyName?.text ?? element.name.text, seen)
            : { source, name }
        }
      }
    }
    // Star barrels are kept intact unless a symbol is explicitly re-exported above.
    return { source, name }
  }
  narrow(source: Source, content: string) {
    const edits: { start: number; end: number; text: string }[] = []
    const printer = ts.createPrinter()
    for (const { ast, offset } of scripts(source.file, content))
      for (const statement of ast.statements) {
        if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
          continue
        const clause = statement.importClause
        if (
          !clause ||
          clause.name ||
          !clause.namedBindings ||
          !ts.isNamedImports(clause.namedBindings)
        )
          continue
        const target = this.resolve(source, statement.moduleSpecifier.text)
        if (!target) continue
        const imports = clause.namedBindings.elements.map((element) => {
          const found = this.binding(target, element.propertyName?.text ?? element.name.text)
          const specifier =
            found.source.repo === source.repo
              ? relative(source.file, found.source.file)
              : (statement.moduleSpecifier as ts.StringLiteral).text
          // Cross-repo barrel narrowing is left to normal dependency traversal.
          if (found.source.repo !== source.repo) return undefined
          return ts.factory.updateImportDeclaration(
            statement,
            statement.modifiers,
            ts.factory.updateImportClause(
              clause,
              clause.isTypeOnly,
              undefined,
              ts.factory.createNamedImports([
                ts.factory.updateImportSpecifier(
                  element,
                  element.isTypeOnly,
                  found.name === element.name.text
                    ? undefined
                    : ts.factory.createIdentifier(found.name),
                  element.name,
                ),
              ]),
            ),
            ts.factory.createStringLiteral(specifier),
            statement.attributes,
          )
        })
        if (imports.every(Boolean))
          edits.push({
            start: offset + statement.getStart(ast),
            end: offset + statement.end,
            text: imports
              .map((s) => printer.printNode(ts.EmitHint.Unspecified, s!, ast))
              .join('\n'),
          })
      }
    return edits
      .sort((a, b) => b.start - a.start)
      .reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), content)
  }
  visit(source: Source): string {
    const id = key(source)
    if (this.nodes.has(id)) return id
    if (/(^|\/)(examples|tests|__tests__)\/|\.(test|spec|stories)\./.test(source.file))
      throw new Error(`Production source reaches excluded file ${id}`)
    const destination = this.destination(source)
    const node = {
      source,
      destination,
      content: '',
      dependencies: [] as string[],
      external: {} as Record<string, string>,
    }
    this.nodes.set(id, node)
    const content = this.narrow(source, this.snapshots[source.repo].read(source.file))
    node.content = rewriteModules(source.file, content, (specifier) => {
      const target = this.resolve(source, specifier)
      if (target) {
        node.dependencies.push(this.visit(target))
        return sourceImport(destination, this.destination(target))
      }
      const name = specifier.startsWith('@')
        ? specifier.split('/').slice(0, 2).join('/')
        : specifier.split('/')[0]!
      const pkg = [...this.packages.values()]
        .filter((p) => p.repo === source.repo && source.file.startsWith(`${p.dir}/`))
        .sort((a, b) => b.dir.length - a.dir.length)[0]
      const version = pkg?.manifest.dependencies?.[name] ?? pkg?.manifest.peerDependencies?.[name]
      if (!version || /^(workspace:|file:|link:)/.test(version))
        throw new Error(`Undeclared external ${specifier} in ${id}`)
      node.external[name] = version
      return specifier
    })
    node.dependencies = [...new Set(node.dependencies)].sort()
    return id
  }
  closure(root: string) {
    const result = new Set<string>()
    const visit = (id: string) => {
      if (result.has(id)) return
      result.add(id)
      this.nodes.get(id)!.dependencies.forEach(visit)
    }
    visit(root)
    return [...result].sort()
  }
}
