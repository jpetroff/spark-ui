import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseCollapsibleReturn } from "./use-collapsible.svelte.ts";

export interface UseCollapsibleContext extends UseCollapsibleReturn {}
export const [CollapsibleProvider, useCollapsibleContext] = createContext<UseCollapsibleContext>({
  name: 'CollapsibleContext',
})
