'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldLabelBaseProps extends PolymorphicProps {}
export interface FieldLabelProps extends HTMLProps<'label'>, FieldLabelBaseProps {}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'label'>>({ className: 'spark-field-label' }, field?.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

FieldLabel.displayName = 'FieldLabel'
