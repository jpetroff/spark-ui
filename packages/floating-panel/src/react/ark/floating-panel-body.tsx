'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelBodyBaseProps extends PolymorphicProps {}
export interface FloatingPanelBodyProps extends HTMLProps<'div'>, FloatingPanelBodyBaseProps {}

export const FloatingPanelBody = forwardRef<HTMLDivElement, FloatingPanelBodyProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getBodyProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelBody.displayName = 'FloatingPanelBody'
