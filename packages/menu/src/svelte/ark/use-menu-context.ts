import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseMenuReturn } from "./use-menu.svelte.ts";

export type UseMenuContext = Accessor<ReturnType<UseMenuReturn>['api']>

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})
