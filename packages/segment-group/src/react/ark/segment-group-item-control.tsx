'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";
import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

export interface SegmentGroupItemControlBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemControlProps extends HTMLProps<'div'>, SegmentGroupItemControlBaseProps {}

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    segmentGroup.getItemControlProps(itemProps),
    parts.itemControl.attrs as Record<string, string>,
    props,
  )

  return <ark.div {...mergedProps} ref={ref} />
})

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
