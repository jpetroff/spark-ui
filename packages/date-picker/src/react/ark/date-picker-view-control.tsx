'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerViewControlBaseProps extends PolymorphicProps {}
export interface DatePickerViewControlProps extends HTMLProps<'div'>, DatePickerViewControlBaseProps {}

export const DatePickerViewControl = forwardRef<HTMLDivElement, DatePickerViewControlProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-view-control' }, datePicker.getViewControlProps(viewProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerViewControl.displayName = 'DatePickerViewControl'
