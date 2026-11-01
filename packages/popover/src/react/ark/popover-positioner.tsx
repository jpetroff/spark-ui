'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePresenceContext } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps extends HTMLProps<'div'>, PopoverPositionerBaseProps {}

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(popover.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverPositioner.displayName = 'PopoverPositioner'
