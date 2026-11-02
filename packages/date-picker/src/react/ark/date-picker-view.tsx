'use client'

import type { ViewProps } from '../../common/zag/date-picker/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { datePickerAnatomy } from "./date-picker.anatomy.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";
import { DatePickerViewPropsProvider } from "./use-date-picker-view-props-context.ts";

export interface DatePickerViewBaseProps extends Required<ViewProps>, PolymorphicProps {}
export interface DatePickerViewProps extends HTMLProps<'div'>, DatePickerViewBaseProps {}

const splitViewProps = createSplitProps<Required<ViewProps>>()

export const DatePickerView = forwardRef<HTMLDivElement, DatePickerViewProps>((props, ref) => {
  const [viewProps, localProps] = splitViewProps(props, ['view'])
  const datePicker = useDatePickerContext()

  return (
    <DatePickerViewPropsProvider value={viewProps}>
      <ark.div
        hidden={datePicker.view !== viewProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...localProps}
        ref={ref}
      />
    </DatePickerViewPropsProvider>
  )
})

DatePickerView.displayName = 'DatePickerView'
