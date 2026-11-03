import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { OptionItemState } from '../../common/zag/menu/index.ts'

export interface UseMenuItemContext extends Accessor<Optional<OptionItemState, 'checked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})
