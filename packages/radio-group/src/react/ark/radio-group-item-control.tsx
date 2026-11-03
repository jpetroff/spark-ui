'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";
import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

export interface RadioGroupItemControlBaseProps extends PolymorphicProps {}
export interface RadioGroupItemControlProps extends HTMLProps<'div'>, RadioGroupItemControlBaseProps {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemControlProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
