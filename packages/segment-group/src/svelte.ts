import './styles.css'

import type { ComponentProps } from 'svelte'
import { SegmentGroup as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/segment-group-composition.svelte'
export * from './svelte/ark/index.ts'

export type SegmentGroupProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/segment-group-composition.svelte. */
export const SegmentGroup = Object.assign(AssembledComponent, ComponentParts)
