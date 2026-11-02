'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldErrorTextBaseProps extends PolymorphicProps {}
export interface FieldErrorTextProps extends HTMLProps<'span'>, FieldErrorTextBaseProps {}

export const FieldErrorText = forwardRef<HTMLSpanElement, FieldErrorTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps({ className: 'spark-field-error-text' }, field.getErrorTextProps(), props)

  if (field?.invalid) {
    return <ark.span {...mergedProps} ref={ref} />
  }
  return null
})

FieldErrorText.displayName = 'FieldErrorText'
