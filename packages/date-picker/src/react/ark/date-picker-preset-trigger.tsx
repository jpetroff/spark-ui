'use client'

import type { PresetTriggerProps } from '../../common/zag/date-picker/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerPresetTriggerBaseProps extends PresetTriggerProps, PolymorphicProps {}
export interface DatePickerPresetTriggerProps extends Assign<HTMLProps<'button'>, DatePickerPresetTriggerBaseProps> {}

const splitPresetTriggerProps = createSplitProps<PresetTriggerProps>()

export const DatePickerPresetTrigger = forwardRef<HTMLButtonElement, DatePickerPresetTriggerProps>((props, ref) => {
  const [presetTriggerProps, localProps] = splitPresetTriggerProps(props, ['value'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps({ className: 'spark-date-picker-preset-trigger' }, datePicker.getPresetTriggerProps(presetTriggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerPresetTrigger.displayName = 'DatePickerPresetTrigger'
