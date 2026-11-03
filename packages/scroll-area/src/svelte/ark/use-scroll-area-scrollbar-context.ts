import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { ScrollbarProps } from '../../common/zag/scroll-area/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export const [ScrollAreaScrollbarProvider, useScrollAreaScrollbarContext] = createContext<Accessor<ScrollbarProps>>({
  name: 'ScrollAreaScrollbarContext',
  hookName: 'useScrollAreaScrollbarContext',
  providerName: '<ScrollAreaScrollbarProvider />',
})
