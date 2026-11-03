import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { ItemBaseProps } from '../../common/zag/menu/index.ts'

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<Accessor<ItemBaseProps>>({
  name: 'MenuItemPropsContext',
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})
