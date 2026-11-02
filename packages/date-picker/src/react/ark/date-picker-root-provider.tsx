'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { type UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import type { UseDatePickerReturn } from "./use-date-picker.ts";
import { DatePickerProvider } from "./use-date-picker-context.ts";

interface RootProviderProps {
  value: UseDatePickerReturn
}

export interface DatePickerRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface DatePickerRootProviderProps extends HTMLProps<'div'>, DatePickerRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const DatePickerRootProvider = forwardRef<HTMLDivElement, DatePickerRootProviderProps>((props, ref) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [{ value: datePicker }, localProps] = splitRootProviderProps(datePickerProps, ['value'])

  const presence = usePresence(mergeProps({ present: datePicker.open }, presenceProps))
  const mergedProps = mergeProps(datePicker.getRootProps(), localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRootProvider.displayName = 'DatePickerRootProvider'
