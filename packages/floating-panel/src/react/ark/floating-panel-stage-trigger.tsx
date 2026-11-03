'use client'

import type { StageTriggerProps } from '../../common/zag/floating-panel/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelStageTriggerBaseProps extends PolymorphicProps, StageTriggerProps {}
export interface FloatingPanelStageTriggerProps extends HTMLProps<'button'>, FloatingPanelStageTriggerBaseProps {}

const splitStageTriggerProps = createSplitProps<StageTriggerProps>()

export const FloatingPanelStageTrigger = forwardRef<HTMLButtonElement, FloatingPanelStageTriggerProps>((props, ref) => {
  const [stage, localProps] = splitStageTriggerProps(props, ['stage'])
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getStageTriggerProps(stage), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelStageTrigger.displayName = 'FloatingPanelStageTrigger'
