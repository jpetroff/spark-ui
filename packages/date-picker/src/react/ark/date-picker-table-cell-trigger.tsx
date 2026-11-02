'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerTableCellPropsContext } from "./use-date-picker-table-cell-props-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTableCellTriggerProps extends HTMLProps<'div'>, DatePickerTableCellTriggerBaseProps {}

export const DatePickerTableCellTrigger = forwardRef<HTMLDivElement, DatePickerTableCellTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableCellProps = useDatePickerTableCellPropsContext()
  const viewProps = useDatePickerViewPropsContext()

  const viewMap = {
    day: datePicker.getDayTableCellTriggerProps,
    month: datePicker.getMonthTableCellTriggerProps,
    year: datePicker.getYearTableCellTriggerProps,
  }

  const viewFn = viewMap[viewProps.view]

  // @ts-expect-error fix later
  const triggerProps = viewFn(tableCellProps)

  const mergedProps = mergeProps(triggerProps, props)

  return <ark.div ref={ref} {...mergedProps} />
})

DatePickerTableCellTrigger.displayName = 'DatePickerTableCellTrigger'
