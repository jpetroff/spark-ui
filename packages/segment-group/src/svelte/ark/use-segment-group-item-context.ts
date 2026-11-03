import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { ItemState } from '@spark/radio-group/common/zag/radio-group/index.ts'

export interface UseSegmentGroupItemContext extends Accessor<ItemState> {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] = createContext<UseSegmentGroupItemContext>({
  name: 'SegmentGroupItemContext',
  hookName: 'useSegmentGroupItemContext',
  providerName: '<SegmentGroupItemProvider />',
})
