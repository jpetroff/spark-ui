'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardPositionerBaseProps extends PolymorphicProps {}
export interface HoverCardPositionerProps extends HTMLProps<'div'>, HoverCardPositionerBaseProps {}

export const HoverCardPositioner = forwardRef<HTMLDivElement, HoverCardPositionerProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardPositioner.displayName = 'HoverCardPositioner'
