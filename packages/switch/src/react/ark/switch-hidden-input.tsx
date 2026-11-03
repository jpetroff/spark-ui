'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useSwitchContext } from "./use-switch-context.ts";

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps extends HTMLProps<'input'>, SwitchHiddenInputBaseProps {}

export const SwitchHiddenInput = forwardRef<HTMLInputElement, SwitchHiddenInputProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

SwitchHiddenInput.displayName = 'SwitchHiddenInput'
