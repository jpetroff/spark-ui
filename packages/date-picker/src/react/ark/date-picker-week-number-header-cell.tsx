'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerTablePropsContext } from "./use-date-picker-table-props-context.ts";

export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps {}
export interface DatePickerWeekNumberHeaderCellProps extends HTMLProps<'th'>, DatePickerWeekNumberHeaderCellBaseProps {}

export const DatePickerWeekNumberHeaderCell = forwardRef<HTMLTableCellElement, DatePickerWeekNumberHeaderCellProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getWeekNumberHeaderCellProps(tableProps), props)

    return <ark.th {...mergedProps} ref={ref} />
  },
)

DatePickerWeekNumberHeaderCell.displayName = 'DatePickerWeekNumberHeaderCell'
