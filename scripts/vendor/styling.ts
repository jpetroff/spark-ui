import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { build } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { root } from './import.ts'
import { configureStyling, stylingModes } from './styling-fixture.ts'

// Run after test:registry. Build the same installed APIs in each styling mode.
for (const framework of ['react', 'svelte']) {
  const dir = path.join(root, '.vendor-tests/consumers', framework)
  for (const mode of stylingModes) {
    const restore = configureStyling(dir, mode)
    try {
      const outDir = `dist-${mode}`
      await build({
        root: dir,
        plugins: mode === 'tailwind' ? [tailwindcss()] : [],
        build: { outDir },
      })
      const css = fs
        .readdirSync(path.join(dir, outDir, 'assets'))
        .filter((file) => file.endsWith('.css'))
        .map((file) => fs.readFileSync(path.join(dir, outDir, 'assets', file), 'utf8'))
        .join('')
      assert.match(css, /spark-dialog-positioner/)
      assert.match(css, /display:none!important/)
      assert.doesNotMatch(css, /@theme|@apply/)
      if (mode === 'functional') {
        assert.doesNotMatch(
          css,
          /spark-button-secondary|--color-background-action:|--font-family-ui:|spark-fieldset-root/,
        )
      } else {
        assert.match(css, /spark-button-secondary/)
        assert.match(css, /--color-background-action:/)
        assert.match(css, /--color-stone-neutral-900:/)
        assert.match(css, /color-scheme:dark/)
      }
      if (mode === 'tailwind') {
        assert.match(css, /\.bg-spark-info-surface/)
        assert.match(css, /var\(--color-background-info\)/)
      }
      console.log(`${framework} (${mode}): installed production CSS passed`)
    } finally {
      restore()
    }
  }
}
