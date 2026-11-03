import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface ValueChangeDetails {
  value: string
}

export interface UseMenuItemGroupContext extends Accessor<{
  id: string
  value?: string
  onValueChange?: (e: ValueChangeDetails) => void
}> {}

export const [MenuItemGroupProvider, useMenuItemGroupContext] = createContext<UseMenuItemGroupContext>({
  name: 'MenuItemGroupContext',
  hookName: 'useMenuItemGroupContext',
  providerName: '<MenuItemGroupProvider />',
})
