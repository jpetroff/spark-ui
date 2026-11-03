'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseNumberInputReturn } from "./use-number-input.ts";

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] = createContext<UseNumberInputContext>({
  name: 'NumberInputContext',
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
