import './styles.css'

import type { ComponentProps } from 'svelte'
import { Switch as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/switch-composition.svelte'
export * from './svelte/ark/index.ts'

export type SwitchProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/switch-composition.svelte. */
export const Switch = Object.assign(AssembledComponent, ComponentParts)
