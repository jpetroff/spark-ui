import './styles.css'

import type { ComponentProps } from 'svelte'
import { FloatingPanel as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/floating-panel-composition.svelte'
export * from './svelte/ark/index.ts'

export type FloatingPanelProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/floating-panel-composition.svelte. */
export const FloatingPanel = Object.assign(AssembledComponent, ComponentParts)
