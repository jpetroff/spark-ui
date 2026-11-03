import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { ItemProps } from '@spark/radio-group/common/zag/radio-group/index.ts'

export interface UseSegmentGroupItemPropsContext extends Accessor<ItemProps> {}

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] =
  createContext<UseSegmentGroupItemPropsContext>({
    name: 'SegmentGroupItemPropsContext',
    hookName: 'useSegmentGroupItemPropsContext',
    providerName: '<SegmentGroupItemPropsProvider />',
  })
