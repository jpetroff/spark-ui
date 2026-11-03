'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";

export interface ScrollAreaCornerBaseProps extends PolymorphicProps {}
export interface ScrollAreaCornerProps extends HTMLProps<'div'>, ScrollAreaCornerBaseProps {}

export const ScrollAreaCorner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getCornerProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaCorner.displayName = 'ScrollAreaCorner'
