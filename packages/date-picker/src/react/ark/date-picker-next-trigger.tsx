'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

export interface DatePickerNextTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerNextTriggerProps extends HTMLProps<'button'>, DatePickerNextTriggerBaseProps {}

export const DatePickerNextTrigger = forwardRef<HTMLButtonElement, DatePickerNextTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-next-trigger' }, datePicker.getNextTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerNextTrigger.displayName = 'DatePickerNextTrigger'
