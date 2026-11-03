'use client'

import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import * as treeView from '../../common/zag/tree-view/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import type { TreeCollection } from "@spark/collection/react/ark/tree-collection.ts";
import type { TreeNode } from "@spark/collection/react/ark/tree-collection.ts";

export interface UseTreeViewProps<T extends TreeNode> extends Optional<
  Omit<treeView.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
}

export interface UseTreeViewReturn<T extends TreeNode> extends treeView.Api<PropTypes, T> {}

export const useTreeView = <T extends TreeNode>(props: UseTreeViewProps<T>): UseTreeViewReturn<T> => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: treeView.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(treeView.machine, machineProps)
  return treeView.connect(service, normalizeProps)
}
