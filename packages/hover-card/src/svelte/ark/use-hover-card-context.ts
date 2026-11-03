import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseHoverCardReturn } from "./use-hover-card.svelte.ts";

export interface UseHoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] = createContext<UseHoverCardContext>({
  name: 'HoverCardContext',
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
