'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = forwardRef<HTMLSelectElement, FieldSelectProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'select'>>(field?.getSelectProps(), props)

  return <ark.select {...mergedProps} ref={ref} />
})

FieldSelect.displayName = 'FieldSelect'
