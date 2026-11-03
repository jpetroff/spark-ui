'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";

export interface RadioGroupLabelBaseProps extends PolymorphicProps {}
export interface RadioGroupLabelProps extends HTMLProps<'span'>, RadioGroupLabelBaseProps {}

export const RadioGroupLabel = forwardRef<HTMLSpanElement, RadioGroupLabelProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

RadioGroupLabel.displayName = 'RadioGroupLabel'
