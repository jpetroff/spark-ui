'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseHoverCardReturn } from "./use-hover-card.ts";

export interface UseHoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] = createContext<UseHoverCardContext>({
  name: 'HoverCardContext',
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
