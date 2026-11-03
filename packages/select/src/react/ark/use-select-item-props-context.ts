'use client'

import type { ItemProps } from '../../common/zag/select/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export const [SelectItemPropsProvider, useSelectItemPropsContext] = createContext<ItemProps>({
  name: 'SelectItemPropsContext',
  hookName: 'useSelectItemPropsContext',
  providerName: '<SelectItemPropsProvider />',
})
