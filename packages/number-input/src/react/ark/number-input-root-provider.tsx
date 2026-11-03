'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseNumberInputReturn } from "./use-number-input.ts";
import { NumberInputProvider } from "./use-number-input-context.ts";

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberInputRootProviderProps extends HTMLProps<'div'>, NumberInputRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const NumberInputRootProvider = forwardRef<HTMLDivElement, NumberInputRootProviderProps>((props, ref) => {
  const [{ value: numberInput }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(numberInput.getRootProps(), localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInputRootProvider.displayName = 'NumberInputRootProvider'
