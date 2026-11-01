import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UsePopoverReturn } from "./use-popover.svelte.ts";

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverContext>({
  name: 'PopoverContext',
})
