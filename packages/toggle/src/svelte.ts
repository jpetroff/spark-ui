import './styles.css'

import type { ComponentProps } from 'svelte'
import { Toggle as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/toggle-composition.svelte'
export * from './svelte/ark/index.ts'

export type ToggleProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/toggle-composition.svelte. */
export const Toggle = Object.assign(AssembledComponent, ComponentParts)
