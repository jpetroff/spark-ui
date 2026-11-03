'use client'

import type { NodeProps } from '../../common/zag/tree-view/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseTreeViewNodePropsContext extends NodeProps {}

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext<UseTreeViewNodePropsContext>({
  name: 'TreeViewNodePropsContext',
  hookName: 'useTreeViewNodePropsContext',
  providerName: '<TreeViewItemProvider />',
})
