'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { useMemo } from 'react'
import { createTreeCollection } from './react/ark/index.ts'
import { TreeView as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Simple editable node model; use the compound API for custom collections or async loading. */
export interface TreeViewSampleNode {
  id: string
  name: string
  children?: TreeViewSampleNode[]
}

/** Editable assembled TreeView. Subcomponents remain available as TreeView.Root, etc. */
export interface TreeViewProps {
  /** Accessible tree label. */
  label: ReactNode
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
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/tree-view
 * @example
 * <TreeView label="Files" nodes={[{ id: "readme", name: "README.md" }]} />
 */
export const TreeView = Object.assign(function TreeView({
  label,
  nodes,
  parts = {},
}: TreeViewProps) {
  const collection = useMemo(
    () =>
      createTreeCollection<TreeViewSampleNode>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: { id: 'ROOT', name: '', children: nodes },
      }),
    [nodes],
  )

  function renderNode(node: TreeViewSampleNode, indexPath: number[]): ReactNode {
    return (
      <ComponentParts.NodeProvider key={node.id} node={node} indexPath={indexPath}>
        {node.children?.length ? (
          <ComponentParts.Branch {...parts.branch}>
            <ComponentParts.BranchControl {...parts.branchControl}>
              <ComponentParts.BranchIndicator aria-hidden="true" {...parts.branchIndicator}>
                ▸
              </ComponentParts.BranchIndicator>
              <ComponentParts.BranchText {...parts.branchText}>
                {node.name}
              </ComponentParts.BranchText>
            </ComponentParts.BranchControl>
            <ComponentParts.BranchContent {...parts.branchContent}>
              {node.children.map((child, index) => renderNode(child, [...indexPath, index]))}
            </ComponentParts.BranchContent>
          </ComponentParts.Branch>
        ) : (
          <ComponentParts.Item {...parts.item}>
            <ComponentParts.ItemText {...parts.itemText}>{node.name}</ComponentParts.ItemText>
          </ComponentParts.Item>
        )}
      </ComponentParts.NodeProvider>
    )
  }

  return (
    <ComponentParts.Root {...parts.root} collection={collection}>
      <ComponentParts.Label {...parts.label}>{label}</ComponentParts.Label>
      <ComponentParts.Tree {...parts.tree}>
        {nodes.map((node, index) => renderNode(node, [index]))}
      </ComponentParts.Tree>
    </ComponentParts.Root>
  )
}, ComponentParts)
