'use client'

import type { ReactNode } from 'react'
import { type UseSegmentGroupContext } from "./use-segment-group-context.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";

export interface SegmentGroupContextProps {
  children: (context: UseSegmentGroupContext) => ReactNode
}

export const SegmentGroupContext = (props: SegmentGroupContextProps) => props.children(useSegmentGroupContext())
