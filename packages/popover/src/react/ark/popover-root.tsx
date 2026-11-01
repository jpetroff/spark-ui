'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from "../../../../presence/src/react/ark/use-presence.ts";
import { PresenceProvider } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePresence } from "../../../../presence/src/react/ark/use-presence.ts";
import { splitPresenceProps } from "../../../../presence/src/react/ark/split-presence-props.ts";
import { type UsePopoverProps } from "./use-popover.ts";
import { usePopover } from "./use-popover.ts";
import { PopoverProvider } from "./use-popover-context.ts";

export interface PopoverRootBaseProps extends UsePopoverProps, UsePresenceProps {}
export interface PopoverRootProps extends PopoverRootBaseProps {
  children?: ReactNode | undefined
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const popover = usePopover(localProps)
  const presence = usePresence(mergeProps({ present: popover.open }, presenceProps))

  return (
    <PopoverProvider value={popover}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
