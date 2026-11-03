'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseNumberInputProps } from "./use-number-input.ts";
import { useNumberInput } from "./use-number-input.ts";
import { NumberInputProvider } from "./use-number-input-context.ts";

export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps {}
export interface NumberInputRootProps extends Assign<HTMLProps<'div'>, NumberInputRootBaseProps> {}

const splitRootProps = createSplitProps<UseNumberInputProps>()

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>((props, ref) => {
  const [useNumberInputProps, localProps] = splitRootProps(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'disabled',
    'focusInputOnChange',
    'form',
    'formatOptions',
    'id',
    'ids',
    'inputMode',
    'invalid',
    'largeStep',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueCommit',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'required',
    'smallStep',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
  const numberInput = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(numberInput.getRootProps(), localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInputRoot.displayName = 'NumberInputRoot'
