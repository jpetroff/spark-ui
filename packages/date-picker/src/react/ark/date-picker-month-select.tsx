'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps {}
export interface DatePickerMonthSelectProps extends HTMLProps<'select'>, DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getMonthSelectProps(), props)

  return (
    <ark.select {...mergedProps} ref={ref}>
      {datePicker.getMonths().map((month, i) => (
        <option key={i} value={month.value}>
          {month.label}
        </option>
      ))}
    </ark.select>
  )
})

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
