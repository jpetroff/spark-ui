<script lang="ts">
  import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@spark/shared/common/zag/json-tree-utils/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { TreeView } from "@spark/tree-view/svelte/ark/index.ts";
import { createTreeCollection } from "@spark/collection/svelte/ark/tree-collection.ts";
import { type TreeViewRootProps } from "@spark/tree-view/svelte/ark/tree-view-root.svelte";
  import { getBranchValues } from "./get-branch-value.ts";
  import { type JsonTreeViewOptions } from "./json-tree-view-props-context.ts";
import { JsonTreeViewPropsProvider } from "./json-tree-view-props-context.ts";

  export interface JsonTreeViewRootBaseProps extends JsonTreeViewOptions {
    /**
     * The data to display in the tree.
     */
    data: unknown
    /**
     * The default expand level.
     */
    defaultExpandedDepth?: number
  }

  export interface JsonTreeViewRootProps
    extends Omit<TreeViewRootProps<JsonNode>, 'collection'>, JsonTreeViewRootBaseProps {}

  let {
    data,
    defaultExpandedDepth,
    expandedValue = $bindable<string[]>(),
    selectedValue = $bindable<string[]>(),
    focusedValue = $bindable<string>(),
    checkedValue = $bindable<string[]>(),
    ...props
  }: JsonTreeViewRootProps = $props()

  const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

  const [jsonTreeProps, localProps] = $derived(
    splitJsonTreeViewProps(props, [
      'maxPreviewItems',
      'collapseStringsAfterLength',
      'quotesOnKeys',
      'groupArraysAfterLength',
      'showNonenumerable',
    ]),
  )

  const collection = $derived(
    createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    }),
  )

  const defaultExpandedValue = $derived(
    defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined,
  )

  JsonTreeViewPropsProvider(() => jsonTreeProps)
</script>

<TreeView.Root
  data-scope="json-tree-view"
  {collection}
  {defaultExpandedValue}
  bind:expandedValue
  bind:selectedValue
  bind:focusedValue
  bind:checkedValue
  {...localProps}
>
  {@render props.children?.()}
</TreeView.Root>
