'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";

export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps {}
export interface SegmentGroupIndicatorProps extends HTMLProps<'div'>, SegmentGroupIndicatorBaseProps {}

export const SegmentGroupIndicator = forwardRef<HTMLDivElement, SegmentGroupIndicatorProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(
    segmentGroup.getIndicatorProps(),
    parts.indicator.attrs as Record<string, string>,
    props,
  )
  return <ark.div {...mergedProps} ref={ref} />
})

SegmentGroupIndicator.displayName = 'SegmentGroupIndicator'
