import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { root } from './import.ts'

export const visualComponents = ['button', 'checkbox', 'field', 'dialog', 'popover', 'date-picker']
export type StylingMode = 'functional' | 'sample' | 'tailwind'

// Toggle the exact opt-in users edit in their installed public index. Component imports stay fixed.
export function configureStyling(dir: string, framework: string, mode: StylingMode) {
  const originals = new Map<string, string>()
  const replace = (file: string, content: string) => {
    originals.set(file, fs.readFileSync(file, 'utf8'))
    fs.writeFileSync(file, content)
  }
  for (const name of visualComponents) {
    const file = path.join(
      dir,
      `src/components/ui/${name}/index.${framework === 'react' ? 'tsx' : 'ts'}`,
    )
    const original = fs.readFileSync(file, 'utf8')
    assert.match(original, /\/\/ import '\.\/recipe\.css'/)
    if (mode !== 'functional')
      replace(file, original.replace("// import './recipe.css'", "import './recipe.css'"))
  }
  if (mode === 'tailwind') {
    const file = path.join(dir, 'src/app.css')
    replace(
      file,
      `@layer theme, base, spark.tokens, spark.theme, spark.base, spark.components, components, utilities;\n@import '${path.join(root, 'node_modules/tailwindcss/index.css')}';\n@import './components/ui/styles/tailwind.css';\n@source inline('bg-spark-info-surface');\n${fs.readFileSync(file, 'utf8')}`,
    )
  }
  return () => {
    for (const [file, original] of originals) fs.writeFileSync(file, original)
  }
}
