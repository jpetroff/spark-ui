import fs from 'node:fs'
import path from 'node:path'
import { root } from './import.ts'

export const stylingModes = ['functional', 'default', 'alternate', 'tailwind'] as const
type StylingMode = (typeof stylingModes)[number]

export function configureStyling(dir: string, mode: StylingMode) {
  const file = path.join(dir, 'src/app.css')
  const original = fs.readFileSync(file, 'utf8')
  const themes = path.join(dir, 'src/components/ui/themes')
  const alternate = path.join(themes, 'alternate')
  const createAlternate = mode === 'alternate'

  // Exercise a full theme folder with different tokens and component rules.
  if (createAlternate) {
    fs.cpSync(path.join(themes, 'default'), alternate, { recursive: true })
    const tokens = path.join(alternate, 'tokens.css')
    fs.writeFileSync(
      tokens,
      fs
        .readFileSync(tokens, 'utf8')
        .replace(
          '--color-background-layer-0: var(--color-stone-neutral-900);',
          '--color-background-layer-0: #212e40;',
        ),
    )
    const popover = path.join(alternate, 'components/popover.css')
    fs.writeFileSync(
      popover,
      fs
        .readFileSync(popover, 'utf8')
        .replace('border-radius: var(--radius-overlay);', 'border-radius: 2px;'),
    )
  }

  const theme = createAlternate ? 'alternate' : 'default'
  const imports =
    mode === 'functional' ? [] : [`@import './components/ui/themes/${theme}/index.css';`]
  if (mode === 'tailwind') {
    imports.unshift(
      '@layer theme, base, spark.tokens, spark.base, spark.components, components, utilities;',
      `@import '${path.join(root, 'node_modules/tailwindcss/index.css')}';`,
    )
    imports.push(
      "@import './components/ui/themes/default/tailwind.css';",
      "@source inline('bg-spark-info-surface');",
    )
  }
  fs.writeFileSync(file, [...imports, original].join('\n'))
  return () => {
    fs.writeFileSync(file, original)
    if (createAlternate) fs.rmSync(alternate, { recursive: true, force: true })
  }
}
