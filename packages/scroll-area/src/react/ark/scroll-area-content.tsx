'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";

export interface ScrollAreaContentBaseProps extends PolymorphicProps {}
export interface ScrollAreaContentProps extends HTMLProps<'div'>, ScrollAreaContentBaseProps {}

export const ScrollAreaContent = forwardRef<HTMLDivElement, ScrollAreaContentProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getContentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ScrollAreaContent.displayName = 'ScrollAreaContent'
