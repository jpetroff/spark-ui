import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseSwapReturn } from "./use-swap.svelte.ts";

export interface UseSwapContext extends Accessor<UseSwapReturn> {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  name: 'SwapContext',
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
})
