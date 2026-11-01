'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "../../../../shared/src/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { PresenceGate } from "../../../../presence/src/react/ark/presence-gate.tsx";
import { usePresenceContext } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverContentBaseProps extends PolymorphicProps {}
export interface PopoverContentProps extends HTMLProps<'div'>, PopoverContentBaseProps {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(popover.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

PopoverContent.displayName = 'PopoverContent'
