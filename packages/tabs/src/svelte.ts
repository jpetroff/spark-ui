import './styles.css'

import type { ComponentProps } from 'svelte'
import { Tabs as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/tabs-composition.svelte'
export * from './svelte/ark/index.ts'

export type TabsProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/tabs-composition.svelte. */
export const Tabs = Object.assign(AssembledComponent, ComponentParts)
