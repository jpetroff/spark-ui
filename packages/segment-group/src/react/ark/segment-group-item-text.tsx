'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";
import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps extends HTMLProps<'span'>, SegmentGroupItemTextBaseProps {}

export const SegmentGroupItemText = forwardRef<HTMLSpanElement, SegmentGroupItemTextProps>((props, ref) => {
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()
  const mergedProps = mergeProps(
    segmentGroup.getItemTextProps(itemProps),
    parts.itemText.attrs as Record<string, string>,
    props,
  )

  return <ark.span {...mergedProps} ref={ref} />
})

SegmentGroupItemText.displayName = 'SegmentGroupItemText'
