import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseToggleReturn } from "./use-toggle.svelte.ts";

export interface UseToggleContext extends UseToggleReturn {}

export const [ToggleProvider, useToggleContext] = createContext<UseToggleContext>({
  name: 'ToggleContext',
  hookName: 'useToggleContext',
  providerName: '<ToggleProvider />',
})
