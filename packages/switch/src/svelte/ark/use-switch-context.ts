import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseSwitchReturn } from "./use-switch.svelte.ts";

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>({
  name: 'SwitchContext',
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
