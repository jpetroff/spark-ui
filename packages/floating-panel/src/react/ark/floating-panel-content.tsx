'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps extends HTMLProps<'div'>, FloatingPanelContentBaseProps {}

export const FloatingPanelContent = forwardRef<HTMLDivElement, FloatingPanelContentProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(floatingPanel.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

FloatingPanelContent.displayName = 'FloatingPanelContent'
