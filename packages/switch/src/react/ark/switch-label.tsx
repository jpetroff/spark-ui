'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSwitchContext } from "./use-switch-context.ts";

export interface SwitchLabelBaseProps extends PolymorphicProps {}
export interface SwitchLabelProps extends HTMLProps<'span'>, SwitchLabelBaseProps {}

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchLabel.displayName = 'SwitchLabel'
