'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = forwardRef<HTMLSelectElement, FieldSelectProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'select'>>({ className: 'spark-field-select' }, field?.getSelectProps(), props)

  return <ark.select {...mergedProps} ref={ref} />
})

FieldSelect.displayName = 'FieldSelect'
