'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxIndicatorBaseProps extends PolymorphicProps {
  indeterminate?: boolean | undefined
}
export interface CheckboxIndicatorProps extends HTMLProps<'div'>, CheckboxIndicatorBaseProps {}

export const CheckboxIndicator = forwardRef<HTMLDivElement, CheckboxIndicatorProps>((props, ref) => {
  const { indeterminate, ...rest } = props
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getIndicatorProps(), rest)
  const isVisible = indeterminate ? checkbox.indeterminate : checkbox.checked

  return <ark.div {...mergedProps} hidden={!isVisible} ref={ref} />
})

CheckboxIndicator.displayName = 'CheckboxIndicator'
