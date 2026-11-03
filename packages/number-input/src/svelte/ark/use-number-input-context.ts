import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseNumberInputReturn } from "./use-number-input.svelte.ts";

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] = createContext<UseNumberInputContext>({
  name: 'NumberInputContext',
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
