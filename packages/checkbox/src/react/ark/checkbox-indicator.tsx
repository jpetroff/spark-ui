'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
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
