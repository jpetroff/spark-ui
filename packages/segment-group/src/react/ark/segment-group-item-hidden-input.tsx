'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSegmentGroupContext } from "./use-segment-group-context.ts";
import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemHiddenInputProps extends HTMLProps<'input'>, SegmentGroupItemHiddenInputBaseProps {}

export const SegmentGroupItemHiddenInput = forwardRef<HTMLInputElement, SegmentGroupItemHiddenInputProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()
    const mergedProps = mergeProps(segmentGroup.getItemHiddenInputProps(itemProps), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemHiddenInput.displayName = 'SegmentGroupItemHiddenInput'
