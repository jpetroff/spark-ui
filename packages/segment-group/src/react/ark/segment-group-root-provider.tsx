'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { parts } from "./segment-group.anatomy.ts";
import type { UseSegmentGroupReturn } from "./use-segment-group.ts";
import { SegmentGroupProvider } from "./use-segment-group-context.ts";

interface RootProviderProps {
  value: UseSegmentGroupReturn
}

export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SegmentGroupRootProviderProps extends HTMLProps<'div'>, SegmentGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SegmentGroupRootProvider = forwardRef<HTMLDivElement, SegmentGroupRootProviderProps>((props, ref) => {
  const [{ value: segmentGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(segmentGroup.getRootProps(), parts.root.attrs as Record<string, string>, localProps)

  return (
    <SegmentGroupProvider value={segmentGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </SegmentGroupProvider>
  )
})

SegmentGroupRootProvider.displayName = 'SegmentGroupRootProvider'
