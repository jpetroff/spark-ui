'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { Orientation } from '@spark/shared/common/zag/types/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";
import { ScrollAreaScrollbarProvider } from "./use-scroll-area-scrollbar-context.ts";

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps {}
export interface ScrollAreaScrollbarProps extends HTMLProps<'div'>, ScrollAreaScrollbarBaseProps {}

const splitScrollbarProps = createSplitProps<ScrollbarProps>()

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const [scrollbarProps, localProps] = splitScrollbarProps(props, ['orientation'])
  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = mergeProps(scrollAreaApi.getScrollbarProps(scrollbarProps), localProps)

  return (
    <ScrollAreaScrollbarProvider value={scrollbarProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaScrollbarProvider>
  )
})

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'
