import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type * as scrollArea from '../../common/zag/scroll-area/index.ts'
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseScrollAreaContext extends Accessor<scrollArea.Api<PropTypes>> {}

export const [ScrollAreaProvider, useScrollAreaContext] = createContext<UseScrollAreaContext>({
  name: 'ScrollAreaContext',
  hookName: 'useScrollAreaContext',
  providerName: '<ScrollAreaProvider />',
})
