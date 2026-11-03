'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseRadioGroupProps } from "./use-radio-group.ts";
import { useRadioGroup } from "./use-radio-group.ts";
import { RadioGroupProvider } from "./use-radio-group-context.ts";

export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps {}
export interface RadioGroupRootProps extends Assign<HTMLProps<'div'>, RadioGroupRootBaseProps> {}

const splitRootProps = createSplitProps<UseRadioGroupProps>()

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>((props, ref) => {
  const [useRadioGroupProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
  const radioGroup = useRadioGroup(useRadioGroupProps)
  const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

  return (
    <RadioGroupProvider value={radioGroup}>
      <ark.div {...mergedProps} ref={ref} />
    </RadioGroupProvider>
  )
})

RadioGroupRoot.displayName = 'RadioGroupRoot'
