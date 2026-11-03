'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import { type UseSegmentGroupProps } from "./use-segment-group.ts";
import { useSegmentGroup } from "./use-segment-group.ts";
import { SegmentGroupProvider } from "./use-segment-group-context.ts";

export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps {}
export interface SegmentGroupRootProps extends Assign<HTMLProps<'div'>, SegmentGroupRootBaseProps> {}

const splitRootProps = createSplitProps<UseSegmentGroupProps>()

export const SegmentGroupRoot = forwardRef<HTMLDivElement, SegmentGroupRootProps>((props, ref) => {
  const [useSegmentGroupProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
  const segmentGroup = useSegmentGroup(useSegmentGroupProps)
  const mergedProps = mergeProps(segmentGroup.getRootProps(), parts.root.attrs as Record<string, string>, localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentGroupProvider>
  )
})

SegmentGroupRoot.displayName = 'SegmentGroupRoot'
