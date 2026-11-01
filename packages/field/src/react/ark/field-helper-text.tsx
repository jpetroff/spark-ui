'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getHelperTextProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

FieldHelperText.displayName = 'FieldHelperText'
