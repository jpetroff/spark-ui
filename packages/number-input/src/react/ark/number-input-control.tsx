'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputControlBaseProps extends PolymorphicProps {}
export interface NumberInputControlProps extends HTMLProps<'div'>, NumberInputControlBaseProps {}

export const NumberInputControl = forwardRef<HTMLDivElement, NumberInputControlProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

NumberInputControl.displayName = 'NumberInputControl'
