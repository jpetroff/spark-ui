'use client'

import type { ScrollbarProps } from '../../common/zag/scroll-area/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export const [ScrollAreaScrollbarProvider, useScrollAreaScrollbarContext] = createContext<ScrollbarProps>({
  name: 'ScrollAreaScrollbarContext',
  hookName: 'useScrollAreaScrollbarContext',
  providerName: '<ScrollAreaScrollbarProvider />',
})
