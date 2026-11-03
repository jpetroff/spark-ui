'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseSwitchReturn } from "./use-switch.ts";

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>({
  name: 'SwitchContext',
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
