'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldErrorTextBaseProps extends PolymorphicProps {}
export interface FieldErrorTextProps extends HTMLProps<'span'>, FieldErrorTextBaseProps {}

export const FieldErrorText = forwardRef<HTMLSpanElement, FieldErrorTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(field.getErrorTextProps(), props)

  if (field?.invalid) {
    return <ark.span {...mergedProps} ref={ref} />
  }
  return null
})

FieldErrorText.displayName = 'FieldErrorText'
