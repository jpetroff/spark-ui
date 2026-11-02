'use client'

import type { DateValue, WeekNumberCellProps } from '../../common/zag/date-picker/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps {
  weekIndex: number
  week: DateValue[]
}
export interface DatePickerWeekNumberCellProps extends HTMLProps<'td'>, DatePickerWeekNumberCellBaseProps {}

const splitWeekNumberCellProps = createSplitProps<WeekNumberCellProps>()

export const DatePickerWeekNumberCell = forwardRef<HTMLTableCellElement, DatePickerWeekNumberCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = splitWeekNumberCellProps(props, ['weekIndex', 'week'])
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getWeekNumberCellProps(cellProps), localProps)

    return <ark.td {...mergedProps} ref={ref} />
  },
)

DatePickerWeekNumberCell.displayName = 'DatePickerWeekNumberCell'
