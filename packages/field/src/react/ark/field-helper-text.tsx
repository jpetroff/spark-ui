'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getHelperTextProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

FieldHelperText.displayName = 'FieldHelperText'
