'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";

export interface SegmentGroupLabelBaseProps extends PolymorphicProps {}
export interface SegmentGroupLabelProps extends HTMLProps<'span'>, SegmentGroupLabelBaseProps {}

export const SegmentGroupLabel = forwardRef<HTMLSpanElement, SegmentGroupLabelProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const mergedProps = mergeProps(segmentGroup.getLabelProps(), parts.label.attrs as Record<string, string>, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
