'use client'

import type { ItemState } from '@spark/radio-group/common/zag/radio-group/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseSegmentGroupItemContext extends ItemState {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] = createContext<UseSegmentGroupItemContext>({
  name: 'SegmentGroupItemContext',
  hookName: 'useSegmentGroupItemContext',
  providerName: '<SegmentGroupItemProvider />',
})
