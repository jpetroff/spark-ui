'use client'

import type { OptionItemState } from '../../common/zag/menu/index.ts'
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseMenuItemContext extends Optional<OptionItemState, 'checked'> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})
