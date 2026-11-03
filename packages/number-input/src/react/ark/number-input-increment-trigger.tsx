'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps extends HTMLProps<'button'>, NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = forwardRef<HTMLButtonElement, NumberInputIncrementTriggerProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getIncrementTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'
