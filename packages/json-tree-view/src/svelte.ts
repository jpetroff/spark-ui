import './styles.css'

import type { ComponentProps } from 'svelte'
import { JsonTreeView as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/json-tree-view-composition.svelte'
export * from './svelte/ark/index.ts'

export type JsonTreeViewProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/json-tree-view-composition.svelte. */
export const JsonTreeView = Object.assign(AssembledComponent, ComponentParts)
