'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxHiddenInputBaseProps extends PolymorphicProps {}
export interface CheckboxHiddenInputProps extends HTMLProps<'input'>, CheckboxHiddenInputBaseProps {}

export const CheckboxHiddenInput = forwardRef<HTMLInputElement, CheckboxHiddenInputProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

CheckboxHiddenInput.displayName = 'CheckboxHiddenInput'
