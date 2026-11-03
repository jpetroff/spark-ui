import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps } from 'svelte'
import { JsonTreeView as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/json-tree-view-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled JsonTreeView. Subcomponents remain available as JsonTreeView.Root, etc. */
export interface JsonTreeViewProps {
  /** JSON-compatible data to inspect. */
  data: unknown
  /** Accessible tree name. */
  label: string
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Expansion depth, selected values, callbacks and JSON display options. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children' | 'data'>
    /** Arrow, indentGuide, renderValue and tree props. */
    tree?: Omit<ComponentProps<typeof ComponentParts.Tree>, 'children' | 'aria-label'>
  }
}

/**
 * Editable markup lives in ./svelte/json-tree-view-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/json-tree-view
 * @example
 * <JsonTreeView label="Configuration" data={{ name: "Spark", enabled: true }} />
 */
export const JsonTreeView = Object.assign(AssembledComponent, ComponentParts)
