'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";

export interface ScrollAreaViewportBaseProps extends PolymorphicProps {}
export interface ScrollAreaViewportProps extends HTMLProps<'div'>, ScrollAreaViewportBaseProps {}

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaViewport.displayName = 'ScrollAreaViewport'
