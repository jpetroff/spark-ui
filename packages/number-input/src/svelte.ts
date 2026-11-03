import './styles.css'

import type { ComponentProps } from 'svelte'
import { NumberInput as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/number-input-composition.svelte'
export * from './svelte/ark/index.ts'

export type NumberInputProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/number-input-composition.svelte. */
export const NumberInput = Object.assign(AssembledComponent, ComponentParts)
