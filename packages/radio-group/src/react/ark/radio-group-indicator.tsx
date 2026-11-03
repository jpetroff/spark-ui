'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps {}
export interface RadioGroupIndicatorProps extends HTMLProps<'div'>, RadioGroupIndicatorBaseProps {}

export const RadioGroupIndicator = forwardRef<HTMLDivElement, RadioGroupIndicatorProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
