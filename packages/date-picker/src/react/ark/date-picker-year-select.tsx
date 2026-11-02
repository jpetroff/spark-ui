'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerYearSelectBaseProps extends PolymorphicProps {}
export interface DatePickerYearSelectProps extends HTMLProps<'select'>, DatePickerYearSelectBaseProps {}

export const DatePickerYearSelect = forwardRef<HTMLSelectElement, DatePickerYearSelectProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getYearSelectProps(), props)

  return (
    <ark.select {...mergedProps} ref={ref}>
      {datePicker.getYears().map((year, i) => (
        <option key={i} value={year.value}>
          {year.label}
        </option>
      ))}
    </ark.select>
  )
})

DatePickerYearSelect.displayName = 'DatePickerYearSelect'
