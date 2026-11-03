import './styles.css'

import type { ComponentProps } from 'svelte'
import { TreeView as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/tree-view-composition.svelte'
export * from './svelte/ark/index.ts'

export type TreeViewProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/tree-view-composition.svelte. */
export const TreeView = Object.assign(AssembledComponent, ComponentParts)
