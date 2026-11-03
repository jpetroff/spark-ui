'use client'

import type { ItemState } from '../../common/zag/select/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseSelectItemContext extends ItemState {}

export const [SelectItemProvider, useSelectItemContext] = createContext<UseSelectItemContext>({
  name: 'SelectItemContext',
  hookName: 'useSelectItemContext',
  providerName: '<SelectItemProvider />',
})
