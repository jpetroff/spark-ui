import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { runIfFn } from "@spark/shared/svelte/ark/utils/run-if-fn.ts";
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@spark/shared/common/zag/json-tree-utils/index.ts'
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'
import type * as treeView from '@spark/tree-view/common/zag/tree-view/index.ts'
import type { MaybeFunction } from '@spark/shared/common/zag/utils/index.ts'
import { untrack } from 'svelte'
import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
import { type UseTreeViewProps } from "@spark/tree-view/svelte/ark/use-tree-view.svelte.ts";
import { createTreeCollection } from "@spark/collection/svelte/ark/tree-collection.ts";
import { useTreeView } from "@spark/tree-view/svelte/ark/use-tree-view.svelte.ts";
import { getBranchValues } from "./get-branch-value.ts";
import type { JsonTreeViewOptions } from "./json-tree-view-props-context.ts";

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends Accessor<
  treeView.Api<PropTypes, JsonNode> & { options: JsonTreeViewOptions }
> {}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const useJsonTreeView = (props: MaybeFunction<UseJsonTreeViewProps>): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = $derived(
    splitJsonTreeViewProps(runIfFn(props), [
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
      rootNode: getRootNode(localProps.data),
    }),
  )

  const machineProps = $derived.by<UseTreeViewProps<JsonNode>>(() => {
    const { data: _, defaultExpandedDepth, ...restProps } = localProps

    const defaultExpandedValue = untrack(() =>
      defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined,
    )

    return {
      collection,
      defaultExpandedValue,
      ...restProps,
      typeahead: false,
    }
  })

  const treeView = useTreeView(() => machineProps)

  const api = $derived({ ...treeView(), options: jsonTreeProps })

  return () => api
}
