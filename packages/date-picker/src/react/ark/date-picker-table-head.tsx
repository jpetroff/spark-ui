'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerTablePropsContext } from "./use-date-picker-table-props-context.ts";

export interface DatePickerTableHeadBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeadProps extends HTMLProps<'thead'>, DatePickerTableHeadBaseProps {}

export const DatePickerTableHead = forwardRef<HTMLTableSectionElement, DatePickerTableHeadProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-table-head' }, datePicker.getTableHeadProps(tableProps), props)

  return <ark.thead {...mergedProps} ref={ref} />
})

DatePickerTableHead.displayName = 'DatePickerTableHead'
