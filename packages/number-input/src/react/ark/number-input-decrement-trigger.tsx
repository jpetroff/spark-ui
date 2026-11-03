'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputDecrementTriggerProps extends HTMLProps<'button'>, NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = forwardRef<HTMLButtonElement, NumberInputDecrementTriggerProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getDecrementTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'
