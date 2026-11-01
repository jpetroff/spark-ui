'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxLabelBaseProps extends PolymorphicProps {}
export interface CheckboxLabelProps extends HTMLProps<'span'>, CheckboxLabelBaseProps {}

export const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CheckboxLabel.displayName = 'CheckboxLabel'
