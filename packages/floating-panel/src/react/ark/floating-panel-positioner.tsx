'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelPositionerBaseProps extends PolymorphicProps {}
export interface FloatingPanelPositionerProps extends HTMLProps<'div'>, FloatingPanelPositionerBaseProps {}

export const FloatingPanelPositioner = forwardRef<HTMLDivElement, FloatingPanelPositionerProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelPositioner.displayName = 'FloatingPanelPositioner'
