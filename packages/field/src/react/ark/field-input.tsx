'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldInputBaseProps extends PolymorphicProps {}
export interface FieldInputProps extends HTMLProps<'input'>, FieldInputBaseProps {}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'input'>>(field?.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

FieldInput.displayName = 'FieldInput'
