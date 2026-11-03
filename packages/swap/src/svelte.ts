import './styles.css'

import type { ComponentProps } from 'svelte'
import { Swap as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/swap-composition.svelte'
export * from './svelte/ark/index.ts'

export type SwapProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/swap-composition.svelte. */
export const Swap = Object.assign(AssembledComponent, ComponentParts)
