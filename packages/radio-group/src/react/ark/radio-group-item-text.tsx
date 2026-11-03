'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

export interface RadioGroupItemTextBaseProps extends PolymorphicProps {}
export interface RadioGroupItemTextProps extends HTMLProps<'span'>, RadioGroupItemTextBaseProps {}

export const RadioGroupItemText = forwardRef<HTMLSpanElement, RadioGroupItemTextProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

RadioGroupItemText.displayName = 'RadioGroupItemText'
