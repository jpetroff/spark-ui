'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import type { UseHoverCardReturn } from "./use-hover-card.ts";
import { HoverCardProvider } from "./use-hover-card-context.ts";

interface RootProviderProps {
  value: UseHoverCardReturn
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const HoverCardRootProvider = (props: HoverCardRootProviderProps) => {
  const [presenceProps, { value: hoverCard, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps({ present: hoverCard.open }, presenceProps))

  return (
    <HoverCardProvider value={hoverCard}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
