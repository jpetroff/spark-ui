import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseSegmentGroupReturn } from "./use-segment-group.svelte.ts";

export interface UseSegmentGroupContext extends UseSegmentGroupReturn {}

export const [SegmentGroupProvider, useSegmentGroupContext] = createContext<UseSegmentGroupContext>({
  name: 'SegmentGroupContext',
  hookName: 'useSegmentGroupContext',
  providerName: '<SegmentGroupProvider />',
})
