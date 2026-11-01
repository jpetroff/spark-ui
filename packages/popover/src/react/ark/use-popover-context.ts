'use client'

import { createContext } from "../../../../shared/src/react/ark/utils/create-context.ts";
import type { UsePopoverReturn } from "./use-popover.ts";

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverContext>({
  name: 'PopoverContext',
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
