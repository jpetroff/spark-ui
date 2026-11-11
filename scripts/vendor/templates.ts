import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-parser'
import { relative } from './aliases.ts'
import type { Framework } from './graph.ts'

// Snapshot the invoking branch's templates before update.ts switches to vendor/upstream.
const directory = new URL('../template/', import.meta.url)
const templates = new Map(
  fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.template') || file === 'tsconfig.json')
    .map((file) => [file, fs.readFileSync(new URL(file, directory), 'utf8')]),
)

export function renderTemplate(file: string, values: Record<string, string> = {}) {
  const template = templates.get(file)
  if (template === undefined)
    throw new Error(`Missing importer template: ${fileURLToPath(new URL(file, directory))}`)
  return template.replace(/{{([a-zA-Z]+)}}/g, (_, name: string) => {
    if (!Object.hasOwn(values, name)) throw new Error(`Unknown placeholder {{${name}}} in ${file}`)
    return values[name]!
  })
}

export function compoundName(file: string, content: string, component: string) {
  const name = component
    .split('-')
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join('')
  const ast = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true)
  return ast.statements.some(
    (node) =>
      ts.isExportDeclaration(node) &&
      !node.isTypeOnly &&
      node.exportClause &&
      ts.isNamespaceExport(node.exportClause) &&
      node.exportClause.name.text === name,
  )
    ? name
    : undefined
}

export function componentStarters(options: {
  component: string
  framework: Framework
  entry: string
  content: string
  assemble: boolean
}) {
  const { component, framework, entry, content, assemble } = options
  const base = `packages/${component}/src`
  const file = `${base}/${framework === 'react' ? 'react.tsx' : 'svelte.ts'}`
  const composition = `${base}/svelte/${component}-composition.svelte`
  const name = assemble ? compoundName(entry, content, component) : undefined
  const values = {
    component,
    componentName: name ?? '',
    entryImport: relative(file, entry),
    compositionImport: relative(file, composition),
    partsImport: relative(composition, entry),
    propsImport: relative(composition, file),
  }
  const template = name
    ? `${framework === 'react' ? 'react.tsx' : 'svelte.ts'}.template`
    : `${framework === 'react' ? 'react-exports.tsx' : 'svelte-exports.ts'}.template`
  return {
    [file]: renderTemplate(template, values),
    [`${base}/styles.css`]: renderTemplate('styles.css.template', values),
    ...(name && framework === 'svelte'
      ? { [composition]: renderTemplate('svelte-composition.svelte.template', values) }
      : {}),
  }
}
