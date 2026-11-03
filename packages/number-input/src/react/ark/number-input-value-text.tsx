'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputValueTextBaseProps extends PolymorphicProps {}
export interface NumberInputValueTextProps extends HTMLProps<'span'>, NumberInputValueTextBaseProps {}

export const NumberInputValueText = forwardRef<HTMLSpanElement, NumberInputValueTextProps>((props, ref) => {
  const { children, ...localProps } = props
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getValueTextProps(), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || numberInput.value}
    </ark.span>
  )
})

NumberInputValueText.displayName = 'NumberInputValueText'
