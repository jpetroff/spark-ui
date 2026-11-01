'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from "../../../../presence/src/react/ark/use-presence.ts";
import { PresenceProvider } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePresence } from "../../../../presence/src/react/ark/use-presence.ts";
import { splitPresenceProps } from "../../../../presence/src/react/ark/split-presence-props.ts";
import type { UsePopoverReturn } from "./use-popover.ts";
import { PopoverProvider } from "./use-popover-context.ts";

interface RootProviderProps {
  value: UsePopoverReturn
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const PopoverRootProvider = (props: PopoverRootProviderProps) => {
  const [presenceProps, { value: popover, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps({ present: popover.open }, presenceProps))

  return (
    <PopoverProvider value={popover}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
