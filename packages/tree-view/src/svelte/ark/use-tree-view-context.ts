import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { TreeNode } from "@spark/collection/svelte/ark/tree-collection.ts";
import type { UseTreeViewReturn } from "./use-tree-view.svelte.ts";

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext<TreeNode>>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
