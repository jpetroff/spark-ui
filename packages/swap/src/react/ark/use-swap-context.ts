'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseSwapReturn } from "./use-swap.ts";

export interface UseSwapContext extends UseSwapReturn {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  name: 'SwapContext',
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
})
