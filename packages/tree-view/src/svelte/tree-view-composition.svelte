<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { TreeViewProps } from '../svelte.ts'
  import { TreeView as ComponentParts } from './ark/index.ts'
  import { createTreeCollection } from './ark/index.ts'
  import type { TreeViewSampleNode } from '../svelte.ts'

  let { label, nodes, parts = {} }: TreeViewProps = $props()
  const collection = $derived(
    createTreeCollection<TreeViewSampleNode>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: { id: 'ROOT', name: '', children: nodes },
    }),
  )
</script>

{#snippet renderNode(node: TreeViewSampleNode, indexPath: number[])}
  <ComponentParts.NodeProvider {node} {indexPath}>
    {#if node.children?.length}
      <ComponentParts.Branch {...parts.branch}>
        <ComponentParts.BranchControl {...parts.branchControl}>
          <ComponentParts.BranchIndicator aria-hidden="true" {...parts.branchIndicator}>▸</ComponentParts.BranchIndicator>
          <ComponentParts.BranchText {...parts.branchText}>{node.name}</ComponentParts.BranchText>
        </ComponentParts.BranchControl>
        <ComponentParts.BranchContent {...parts.branchContent}>
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index])}
          {/each}
        </ComponentParts.BranchContent>
      </ComponentParts.Branch>
    {:else}
      <ComponentParts.Item {...parts.item}>
        <ComponentParts.ItemText {...parts.itemText}>{node.name}</ComponentParts.ItemText>
      </ComponentParts.Item>
    {/if}
  </ComponentParts.NodeProvider>
{/snippet}

<ComponentParts.Root {...parts.root} {collection}>
  <ComponentParts.Label {...parts.label}>{@render label()}</ComponentParts.Label>
  <ComponentParts.Tree {...parts.tree}>
    {#each nodes as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </ComponentParts.Tree>
</ComponentParts.Root>
