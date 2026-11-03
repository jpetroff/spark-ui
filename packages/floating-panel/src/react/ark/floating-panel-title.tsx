'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelTitleBaseProps extends PolymorphicProps {}
export interface FloatingPanelTitleProps extends HTMLProps<'h2'>, FloatingPanelTitleBaseProps {}

export const FloatingPanelTitle = forwardRef<HTMLDivElement, FloatingPanelTitleProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

FloatingPanelTitle.displayName = 'FloatingPanelTitle'
