import { test } from 'node:test'
import assert from 'node:assert/strict'
import { componentStarters, compoundName, renderTemplate } from './templates.ts'

test('template rendering rejects missing files and unknown placeholders', () => {
  assert.throws(() => renderTemplate('missing.template'), /Missing importer template/)
  assert.throws(() => renderTemplate('styles.css.template'), /Unknown placeholder {{component}}/)
})

test('compound detection uses namespace syntax and preserves provider and utility barrels', () => {
  assert.equal(
    compoundName('index.ts', "export * as PinInput from './pin-input.ts'", 'pin-input'),
    'PinInput',
  )
  for (const content of [
    "// export * as Sample from './sample.ts'",
    "export type * as Sample from './sample.ts'",
    "export { SampleProvider } from './provider.ts'",
  ]) {
    assert.equal(compoundName('index.ts', content, 'sample'), undefined)
    const files = componentStarters({
      component: 'sample',
      framework: 'svelte',
      entry: 'packages/sample/src/svelte/ark/index.ts',
      content,
      hasRecipe: false,
      assemble: true,
    })
    assert.equal(Object.keys(files).length, 2)
    assert.doesNotMatch(files['packages/sample/src/svelte.ts']!, /Object.assign|composition.svelte/)
  }
})
