'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerPositionerBaseProps extends PolymorphicProps {}
export interface DatePickerPositionerProps extends HTMLProps<'div'>, DatePickerPositionerBaseProps {}

export const DatePickerPositioner = forwardRef<HTMLDivElement, DatePickerPositionerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-positioner' }, datePicker.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerPositioner.displayName = 'DatePickerPositioner'
