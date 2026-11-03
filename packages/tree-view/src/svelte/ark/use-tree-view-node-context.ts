import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { NodeState } from '../../common/zag/tree-view/index.ts'

export interface UseTreeViewNodeContext extends Accessor<NodeState> {}

export const [TreeViewNodeProvider, useTreeViewNodeContext] = createContext<UseTreeViewNodeContext>({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
