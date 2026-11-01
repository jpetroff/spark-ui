'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "../../../../field/src/react/ark/use-field-context.ts";
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
