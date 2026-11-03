'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";
import { useScrollAreaScrollbarContext } from "./use-scroll-area-scrollbar-context.ts";

export interface ScrollAreaThumbBaseProps extends PolymorphicProps {}
export interface ScrollAreaThumbProps extends HTMLProps<'div'>, ScrollAreaThumbBaseProps {}

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>((props, ref) => {
  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = mergeProps(scrollAreaApi.getThumbProps(scrollbarProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaThumb.displayName = 'ScrollAreaThumb'
