'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps extends HTMLProps<'input'>, NumberInputInputBaseProps {}

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

NumberInputInput.displayName = 'NumberInputInput'
