'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectTriggerBaseProps extends PolymorphicProps {}
export interface SelectTriggerProps extends HTMLProps<'button'>, SelectTriggerBaseProps {}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getTriggerProps(), props)
  const field = useFieldContext()

  return <ark.button aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

SelectTrigger.displayName = 'SelectTrigger'
