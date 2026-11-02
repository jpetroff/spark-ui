'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerControlBaseProps extends PolymorphicProps {}
export interface DatePickerControlProps extends HTMLProps<'div'>, DatePickerControlBaseProps {}

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-control' }, datePicker.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerControl.displayName = 'DatePickerControl'
