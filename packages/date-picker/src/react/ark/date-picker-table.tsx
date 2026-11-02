'use client'

import type { TableProps } from '../../common/zag/date-picker/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef, useId } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { DatePickerTablePropsProvider } from "./use-date-picker-table-props-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerTableBaseProps extends Pick<TableProps, 'columns'>, PolymorphicProps {}
export interface DatePickerTableProps extends HTMLProps<'table'>, DatePickerTableBaseProps {}

const splitTableProps = createSplitProps<Pick<TableProps, 'columns'>>()

export const DatePickerTable = forwardRef<HTMLTableElement, DatePickerTableProps>((props, ref) => {
  const [{ columns }, localProps] = splitTableProps(props, ['columns'])
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const tableProps = { columns, id: useId(), ...viewProps }
  const mergedProps = mergeProps({ className: 'spark-date-picker-table' }, datePicker.getTableProps(tableProps), localProps)

  return (
    <DatePickerTablePropsProvider value={tableProps}>
      <ark.table {...mergedProps} ref={ref} />
    </DatePickerTablePropsProvider>
  )
})

DatePickerTable.displayName = 'DatePickerTable'
