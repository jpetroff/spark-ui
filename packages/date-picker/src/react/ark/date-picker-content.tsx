'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerContentBaseProps extends PolymorphicProps {}
export interface DatePickerContentProps extends HTMLProps<'div'>, DatePickerContentBaseProps {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(datePicker.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

DatePickerContent.displayName = 'DatePickerContent'
