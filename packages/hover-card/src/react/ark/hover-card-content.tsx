'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardContentBaseProps extends PolymorphicProps {}
export interface HoverCardContentProps extends HTMLProps<'div'>, HoverCardContentBaseProps {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(hoverCard.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

HoverCardContent.displayName = 'HoverCardContent'
