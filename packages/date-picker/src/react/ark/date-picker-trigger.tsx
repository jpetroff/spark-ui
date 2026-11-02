'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerTrigger.displayName = 'DatePickerTrigger'
