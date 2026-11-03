'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputLabelBaseProps extends PolymorphicProps {}
export interface NumberInputLabelProps extends HTMLProps<'label'>, NumberInputLabelBaseProps {}

export const NumberInputLabel = forwardRef<HTMLLabelElement, NumberInputLabelProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

NumberInputLabel.displayName = 'NumberInputLabel'
