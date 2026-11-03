'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface RadioGroupItemHiddenInputProps extends HTMLProps<'input'>, RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = forwardRef<HTMLInputElement, RadioGroupItemHiddenInputProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} ref={ref} />
})

RadioGroupItemHiddenInput.displayName = 'RadioGroupItemHiddenInput'
