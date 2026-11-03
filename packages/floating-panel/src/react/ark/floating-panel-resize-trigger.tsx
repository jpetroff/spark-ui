'use client'

import type { ResizeTriggerProps } from '../../common/zag/floating-panel/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps {}
export interface FloatingPanelResizeTriggerProps extends HTMLProps<'div'>, FloatingPanelResizeTriggerBaseProps {}

const splitResizeTriggerProps = createSplitProps<ResizeTriggerProps>()

export const FloatingPanelResizeTrigger = forwardRef<HTMLDivElement, FloatingPanelResizeTriggerProps>((props, ref) => {
  const [resizeProps, localProps] = splitResizeTriggerProps(props, ['axis'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getResizeTriggerProps(resizeProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

FloatingPanelResizeTrigger.displayName = 'FloatingPanelResizeTrigger'
