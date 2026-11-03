'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseRadioGroupReturn } from "./use-radio-group.ts";
import { RadioGroupProvider } from "./use-radio-group-context.ts";

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RadioGroupRootProviderProps extends HTMLProps<'div'>, RadioGroupRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const RadioGroupRootProvider = forwardRef<HTMLDivElement, RadioGroupRootProviderProps>((props, ref) => {
  const [{ value: radioGroup }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </RadioGroupProvider>
  )
})

RadioGroupRootProvider.displayName = 'RadioGroupRootProvider'
