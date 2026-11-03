'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps extends HTMLProps<'button'>, FloatingPanelTriggerBaseProps {}

export const FloatingPanelTrigger = forwardRef<HTMLButtonElement, FloatingPanelTriggerProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const triggerProps = floatingPanel.getTriggerProps()
  const mergedProps = mergeProps(
    {
      ...triggerProps,
      'aria-controls': presence.unmounted ? undefined : triggerProps['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelTrigger.displayName = 'FloatingPanelTrigger'
