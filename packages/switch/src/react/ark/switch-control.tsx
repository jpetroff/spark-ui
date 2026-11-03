'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSwitchContext } from "./use-switch-context.ts";

export interface SwitchControlBaseProps extends PolymorphicProps {}
export interface SwitchControlProps extends HTMLProps<'span'>, SwitchControlBaseProps {}

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getControlProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchControl.displayName = 'SwitchControl'
