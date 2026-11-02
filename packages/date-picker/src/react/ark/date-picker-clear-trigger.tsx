'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerClearTriggerProps extends HTMLProps<'button'>, DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, DatePickerClearTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
