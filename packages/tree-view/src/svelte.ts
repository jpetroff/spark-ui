import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { TreeView as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/tree-view-composition.svelte'
export * from './svelte/ark/index.ts'

/** Simple editable node model; use the compound API for custom collections or async loading. */
export interface TreeViewSampleNode {
  id: string
  name: string
  children?: TreeViewSampleNode[]
}

/** Editable assembled TreeView. Subcomponents remain available as TreeView.Root, etc. */
export interface TreeViewProps {
  /** Accessible tree label. */
  label: Snippet
  /** Nodes with globally unique IDs; children create expandable branches. */
  nodes: TreeViewSampleNode[]
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Expanded/selected values, selectionMode, callbacks and render strategy. */
    root?: Omit<
      ComponentProps<typeof ComponentParts.Root<TreeViewSampleNode>>,
      'children' | 'collection'
    >
    /** Tree label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Tree container props. */
    tree?: Omit<ComponentProps<typeof ComponentParts.Tree>, 'children'>
    /** Shared branch wrapper props. */
    branch?: Omit<ComponentProps<typeof ComponentParts.Branch>, 'children'>
    /** Shared branch row props. */
    branchControl?: Omit<ComponentProps<typeof ComponentParts.BranchControl>, 'children'>
    /** Expansion indicator props. */
    branchIndicator?: Omit<ComponentProps<typeof ComponentParts.BranchIndicator>, 'children'>
    /** Branch text props. */
    branchText?: Omit<ComponentProps<typeof ComponentParts.BranchText>, 'children'>
    /** Child group props. */
    branchContent?: Omit<ComponentProps<typeof ComponentParts.BranchContent>, 'children'>
    /** Shared leaf row props. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children'>
    /** Leaf text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/tree-view-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/tree-view
 * @example
 * <TreeView nodes={[{ id: "readme", name: "README.md" }]}>{#snippet label()}Files{/snippet}</TreeView>
 */
export const TreeView = Object.assign(AssembledComponent, ComponentParts)
