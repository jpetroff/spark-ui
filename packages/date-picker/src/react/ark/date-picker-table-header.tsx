'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerTablePropsContext } from "./use-date-picker-table-props-context.ts";

export interface DatePickerTableHeaderBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeaderProps extends HTMLProps<'th'>, DatePickerTableHeaderBaseProps {}

export const DatePickerTableHeader = forwardRef<HTMLTableCellElement, DatePickerTableHeaderProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-table-header' }, datePicker.getTableHeaderProps(tableProps), props)

  return <ark.th {...mergedProps} ref={ref} />
})

DatePickerTableHeader.displayName = 'DatePickerTableHeader'
