'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { type UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { type UseDatePickerProps } from "./use-date-picker.ts";
import { useDatePicker } from "./use-date-picker.ts";
import { DatePickerProvider } from "./use-date-picker-context.ts";

export interface DatePickerRootBaseProps extends UseDatePickerProps, UsePresenceProps, PolymorphicProps {}
export interface DatePickerRootProps extends Assign<HTMLProps<'div'>, DatePickerRootBaseProps> {}

const splitRootProps = createSplitProps<UseDatePickerProps>()

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>((props, ref) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [useDatePickerProps, localProps] = splitRootProps(datePickerProps, [
    'closeOnSelect',
    'createCalendar',
    'defaultFocusedValue',
    'defaultOpen',
    'defaultValue',
    'defaultView',
    'disabled',
    'fixedWeeks',
    'focusedValue',
    'format',
    'id',
    'ids',
    'inline',
    'invalid',
    'isDateUnavailable',
    'locale',
    'max',
    'maxView',
    'min',
    'minView',
    'name',
    'numOfMonths',
    'onFocusChange',
    'onOpenChange',
    'onValueChange',
    'onViewChange',
    'onVisibleRangeChange',
    'open',
    'outsideDaySelectable',
    'parse',
    'placeholder',
    'positioning',
    'readOnly',
    'required',
    'selectionMode',
    'startOfWeek',
    'timeZone',
    'translations',
    'value',
    'view',
    'openOnClick',
    'showWeekNumbers',
    'maxSelectedDates',
  ])
  const datePicker = useDatePicker(useDatePickerProps)
  const presence = usePresence(mergeProps({ present: datePicker.open }, presenceProps))
  const mergedProps = mergeProps({ className: 'spark-date-picker-root' }, datePicker.getRootProps(), localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRoot.displayName = 'DatePickerRoot'
