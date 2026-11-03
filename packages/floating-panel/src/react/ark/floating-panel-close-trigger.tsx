'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelCloseTriggerProps extends HTMLProps<'button'>, FloatingPanelCloseTriggerBaseProps {}

export const FloatingPanelCloseTrigger = forwardRef<HTMLButtonElement, FloatingPanelCloseTriggerProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelCloseTrigger.displayName = 'FloatingPanelCloseTrigger'
