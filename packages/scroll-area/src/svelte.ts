import './styles.css'

import type { ComponentProps } from 'svelte'
import { ScrollArea as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/scroll-area-composition.svelte'
export * from './svelte/ark/index.ts'

export type ScrollAreaProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/scroll-area-composition.svelte. */
export const ScrollArea = Object.assign(AssembledComponent, ComponentParts)
