'use client'

import type { ItemGroupProps } from '../../common/zag/select/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseSelectItemGroupPropsContext extends ItemGroupProps {}

export const [SelectItemGroupPropsProvider, useSelectItemGroupPropsContext] = createContext<ItemGroupProps>({
  name: 'SelectItemGroupPropsContext',
  hookName: 'useSelectItemGroupPropsContext',
  providerName: '<SelectItemGroupPropsProvider />',
})
