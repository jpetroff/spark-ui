'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { TreeNode } from "@spark/collection/react/ark/tree-collection.ts";
import type { UseTreeViewReturn } from "./use-tree-view.ts";

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext<TreeNode>>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
