'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectClearTriggerBaseProps extends PolymorphicProps {}
export interface SelectClearTriggerProps extends HTMLProps<'button'>, SelectClearTriggerBaseProps {}

export const SelectClearTrigger = forwardRef<HTMLButtonElement, SelectClearTriggerProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

SelectClearTrigger.displayName = 'SelectClearTrigger'
