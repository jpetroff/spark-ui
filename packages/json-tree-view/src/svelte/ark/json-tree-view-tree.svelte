<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { TreeView } from "@spark/tree-view/svelte/ark/index.ts";
import { useTreeViewContext } from "@spark/tree-view/svelte/ark/use-tree-view-context.ts";
import { type TreeViewTreeProps } from "@spark/tree-view/svelte/ark/tree-view-tree.svelte";
  import JsonTreeViewNode, { type JsonTreeViewNodeBaseProps } from './json-tree-view-node.svelte'

  export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

  export interface JsonTreeViewTreeProps extends TreeViewTreeProps, JsonTreeViewTreeBaseProps {}

  const props: JsonTreeViewTreeProps = $props()

  const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()
  const [nodeProps, treeProps] = $derived(splitTreeNodeProps(props, ['arrow', 'indentGuide', 'renderValue']))

  const tree = useTreeViewContext()
  const children = $derived(tree().collection.getNodeChildren(tree().collection.rootNode))
</script>

<TreeView.Tree data-scope="json-tree-view" {...treeProps}>
  {#each children as child, index (index)}
    <JsonTreeViewNode node={child} indexPath={[index]} {...nodeProps} />
  {/each}
</TreeView.Tree>
