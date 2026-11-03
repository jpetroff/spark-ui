'use client'

import type { TreeNode } from "@spark/collection/react/ark/tree-collection.ts";
import { type UseTreeViewContext } from "./use-tree-view-context.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";

export interface TreeViewContextProps<T extends TreeNode> {
  children: (context: UseTreeViewContext<T>) => React.ReactNode
}

export const TreeViewContext = <T extends TreeNode>(props: TreeViewContextProps<T>) =>
  props.children(useTreeViewContext())
