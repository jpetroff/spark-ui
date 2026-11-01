'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps extends HTMLProps<'div'>, CheckboxControlBaseProps {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CheckboxControl.displayName = 'CheckboxControl'
