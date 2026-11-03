'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelControlBaseProps extends PolymorphicProps {}
export interface FloatingPanelControlProps extends HTMLProps<'div'>, FloatingPanelControlBaseProps {}

export const FloatingPanelControl = forwardRef<HTMLDivElement, FloatingPanelControlProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelControl.displayName = 'FloatingPanelControl'
