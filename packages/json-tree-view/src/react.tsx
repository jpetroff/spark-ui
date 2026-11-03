'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps } from 'react'
import { JsonTreeView as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

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
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/json-tree-view
 * @example
 * <JsonTreeView label="Configuration" data={{ name: "Spark", enabled: true }} />
 */
export const JsonTreeView = Object.assign(function JsonTreeView({
  data,
  label,
  parts = {},
}: JsonTreeViewProps) {
  return (
    <ComponentParts.Root {...parts.root} data={data}>
      <ComponentParts.Tree {...parts.tree} aria-label={label} />
    </ComponentParts.Root>
  )
}, ComponentParts)
