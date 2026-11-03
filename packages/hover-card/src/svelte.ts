import './styles.css'

import type { ComponentProps } from 'svelte'
import { HoverCard as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/hover-card-composition.svelte'
export * from './svelte/ark/index.ts'

export type HoverCardProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/hover-card-composition.svelte. */
export const HoverCard = Object.assign(AssembledComponent, ComponentParts)
