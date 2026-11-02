'use client'

import type { InputProps } from '../../common/zag/date-picker/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDatePickerContext } from "./use-date-picker-context.ts";

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps {}
export interface DatePickerInputProps extends HTMLProps<'input'>, DatePickerInputBaseProps {}

const splitInputProps = createSplitProps<InputProps>()

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>((props, ref) => {
  const [inputProps, localProps] = splitInputProps(props, ['index', 'fixOnBlur'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

DatePickerInput.displayName = 'DatePickerInput'
