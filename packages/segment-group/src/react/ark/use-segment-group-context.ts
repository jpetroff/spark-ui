'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseSegmentGroupReturn } from "./use-segment-group.ts";

export interface UseSegmentGroupContext extends UseSegmentGroupReturn {}

export const [SegmentGroupProvider, useSegmentGroupContext] = createContext<UseSegmentGroupContext>({
  name: 'SegmentGroupContext',
  hookName: 'useSegmentGroupContext',
  providerName: '<SegmentGroupProvider />',
})
