'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelHeaderBaseProps extends PolymorphicProps {}
export interface FloatingPanelHeaderProps extends HTMLProps<'div'>, FloatingPanelHeaderBaseProps {}

export const FloatingPanelHeader = forwardRef<HTMLDivElement, FloatingPanelHeaderProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getHeaderProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelHeader.displayName = 'FloatingPanelHeader'
