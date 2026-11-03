'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseCollapsibleReturn } from "./use-collapsible.ts";

export interface UseCollapsibleContext extends UseCollapsibleReturn {}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<UseCollapsibleContext>({
  name: 'CollapsibleContext',
  hookName: 'useCollapsibleContext',
  providerName: '<CollapsibleProvider />',
})
