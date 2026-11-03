'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useNumberInputContext } from "./use-number-input-context.ts";

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps extends HTMLProps<'div'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

NumberInputScrubber.displayName = 'NumberInputScrubber'
