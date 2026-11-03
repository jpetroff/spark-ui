'use client'

import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@spark/shared/common/zag/json-tree-utils/index.ts'
import { useMemo } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type UseTreeViewProps } from "@spark/tree-view/react/ark/use-tree-view.ts";
import { type UseTreeViewReturn } from "@spark/tree-view/react/ark/use-tree-view.ts";
import { createTreeCollection } from "@spark/collection/react/ark/tree-collection.ts";
import { useTreeView } from "@spark/tree-view/react/ark/use-tree-view.ts";
import { getBranchValues } from "./get-branch-value.ts";
import type { JsonTreeViewOptions } from "./json-tree-view-props-context.ts";

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {
  options: JsonTreeViewOptions
}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const useJsonTreeView = (props: UseJsonTreeViewProps): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(props, [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const { data, defaultExpandedDepth = 1, ...restProps } = localProps

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  const defaultExpandedValue = useMemo(() => {
    return defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined
  }, [collection, defaultExpandedDepth])

  const treeView = useTreeView({
    defaultExpandedValue,
    ...restProps,
    collection,
    typeahead: false,
  })

  return { ...treeView, options: jsonTreeProps }
}
