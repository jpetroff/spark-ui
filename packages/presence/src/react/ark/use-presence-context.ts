'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UsePresenceReturn } from "./use-presence.ts";

export interface UsePresenceContext extends UsePresenceReturn {}

export const [PresenceProvider, usePresenceContext] = createContext<UsePresenceContext>({
  name: 'PresenceContext',
  hookName: 'usePresenceContext',
  providerName: '<PresenceProvider />',
})
