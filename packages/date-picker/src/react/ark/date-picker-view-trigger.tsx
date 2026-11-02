'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerViewTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerViewTriggerProps extends HTMLProps<'button'>, DatePickerViewTriggerBaseProps {}

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-view-trigger' }, datePicker.getViewTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
