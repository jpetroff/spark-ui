import './styles.css'

import type { ComponentProps } from 'svelte'
import { Format as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/format-composition.svelte'
export * from './svelte/ark/index.ts'

export type FormatProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/format-composition.svelte. */
export const Format = Object.assign(AssembledComponent, ComponentParts)
