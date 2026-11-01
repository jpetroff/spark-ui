'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldLabelBaseProps extends PolymorphicProps {}
export interface FieldLabelProps extends HTMLProps<'label'>, FieldLabelBaseProps {}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'label'>>(field?.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

FieldLabel.displayName = 'FieldLabel'
