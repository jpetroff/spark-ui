'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardArrowTipBaseProps extends PolymorphicProps {}
export interface HoverCardArrowTipProps extends HTMLProps<'div'>, HoverCardArrowTipBaseProps {}

export const HoverCardArrowTip = forwardRef<HTMLDivElement, HoverCardArrowTipProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrowTip.displayName = 'HoverCardArrowTip'
