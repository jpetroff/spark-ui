'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { DatePickerTableCellPropsProvider } from "./use-date-picker-table-cell-props-context.ts";
import { type UseDatePickerTableCellPropsContext } from "./use-date-picker-table-cell-props-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerTableCellBaseProps extends UseDatePickerTableCellPropsContext, PolymorphicProps {}
export interface DatePickerTableCellProps extends HTMLProps<'td'>, DatePickerTableCellBaseProps {}

const splitTableCellProps = createSplitProps<UseDatePickerTableCellPropsContext>()

export const DatePickerTableCell = forwardRef<HTMLTableCellElement, DatePickerTableCellProps>((props, ref) => {
  const [cellProps, localProps] = splitTableCellProps(props, ['disabled', 'value', 'visibleRange', 'columns'])

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const tableCellProps = {
    day: datePicker.getDayTableCellProps,
    month: datePicker.getMonthTableCellProps,
    year: datePicker.getYearTableCellProps,
    // @ts-expect-error value is number filter
  }[viewProps.view](cellProps)

  const mergedProps = mergeProps({ className: 'spark-date-picker-table-cell' }, tableCellProps, localProps)

  return (
    <DatePickerTableCellPropsProvider value={cellProps}>
      <ark.td ref={ref} {...mergedProps} />
    </DatePickerTableCellPropsProvider>
  )
})

DatePickerTableCell.displayName = 'DatePickerTableCell'
