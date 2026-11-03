'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseScrollAreaProps } from "./use-scroll-area.ts";
import { useScrollArea } from "./use-scroll-area.ts";
import { ScrollAreaProvider } from "./use-scroll-area-context.ts";

export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps {}
export interface ScrollAreaRootProps extends HTMLProps<'div'>, ScrollAreaRootBaseProps {}

const splitRootProps = createSplitProps<UseScrollAreaProps>()

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaRootProps>((props, ref) => {
  const [useScrollAreaProps, localProps] = splitRootProps(props, ['id', 'ids'])
  const scrollArea = useScrollArea(useScrollAreaProps)
  const mergedProps = mergeProps(scrollArea.getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaProvider>
  )
})

ScrollAreaRoot.displayName = 'ScrollAreaRoot'
