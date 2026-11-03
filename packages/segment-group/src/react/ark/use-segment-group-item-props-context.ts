'use client'

import type { ItemProps } from '@spark/radio-group/common/zag/radio-group/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export const [SegmentGroupItemPropsProvider, useSegmentGroupItemPropsContext] = createContext<ItemProps>({
  name: 'SegmentGroupItemPropsContext',
  hookName: 'useSegmentGroupItemPropsContext',
  providerName: '<SegmentGroupItemPropsProvider />',
})
