'use client'

import type { ItemBaseProps } from '../../common/zag/menu/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<ItemBaseProps>({
  name: 'MenuItemPropsContext',
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})
