'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { uniq } from '@spark/shared/common/zag/utils/index.ts'
import { forwardRef, useMemo } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps extends HTMLProps<'div'>, DatePickerRangeTextBaseProps {}

export const DatePickerRangeText = forwardRef<HTMLDivElement, DatePickerRangeTextProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getRangeTextProps(), props)
  const visibleRangeText = useMemo(() => {
    const { start, end } = datePicker.visibleRangeText
    return uniq([start, end]).filter(Boolean).join(' - ')
  }, [datePicker.visibleRangeText])

  return (
    <ark.div {...mergedProps} ref={ref}>
      {visibleRangeText}
    </ark.div>
  )
})

DatePickerRangeText.displayName = 'DatePickerRangeText'
