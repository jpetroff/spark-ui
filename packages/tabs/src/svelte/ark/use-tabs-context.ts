import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseTabsReturn } from "./use-tabs.svelte.ts";

export interface UseTabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<UseTabsContext>({
  name: 'TabsContext',
  hookName: 'useTabsContext',
  providerName: '<TabsProvider />',
})
