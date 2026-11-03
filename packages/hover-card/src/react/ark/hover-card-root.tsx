'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { type UseHoverCardProps } from "./use-hover-card.ts";
import { useHoverCard } from "./use-hover-card.ts";
import { HoverCardProvider } from "./use-hover-card-context.ts";

export interface HoverCardRootBaseProps extends UseHoverCardProps, UsePresenceProps {}
export interface HoverCardRootProps extends HoverCardRootBaseProps {
  children?: ReactNode | undefined
}

export const HoverCardRoot = (props: HoverCardRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const hoverCard = useHoverCard(localProps)
  const presence = usePresence(mergeProps({ present: hoverCard.open }, presenceProps))

  return (
    <HoverCardProvider value={hoverCard}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
