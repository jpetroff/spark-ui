'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerLabelBaseProps extends PolymorphicProps {}
export interface DatePickerLabelProps extends HTMLProps<'label'>, DatePickerLabelBaseProps {}

export const DatePickerLabel = forwardRef<HTMLLabelElement, DatePickerLabelProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-label' }, datePicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

DatePickerLabel.displayName = 'DatePickerLabel'
