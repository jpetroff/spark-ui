'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardArrowBaseProps extends PolymorphicProps {}
export interface HoverCardArrowProps extends HTMLProps<'div'>, HoverCardArrowBaseProps {}

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCardArrowProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrow.displayName = 'HoverCardArrow'
