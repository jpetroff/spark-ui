import './styles.css'

import type { ComponentProps } from 'svelte'
import { Select as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/select-composition.svelte'
export * from './svelte/ark/index.ts'

export type SelectProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/select-composition.svelte. */
export const Select = Object.assign(AssembledComponent, ComponentParts)
