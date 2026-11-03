'use client'

import type { NodeState } from '../../common/zag/tree-view/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseTreeViewNodeContext extends NodeState {}

export const [TreeViewNodeStateProvider, useTreeViewNodeContext] = createContext<UseTreeViewNodeContext>({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
