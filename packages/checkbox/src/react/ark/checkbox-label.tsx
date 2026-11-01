'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxLabelBaseProps extends PolymorphicProps {}
export interface CheckboxLabelProps extends HTMLProps<'span'>, CheckboxLabelBaseProps {}

export const CheckboxLabel = forwardRef<HTMLSpanElement, CheckboxLabelProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CheckboxLabel.displayName = 'CheckboxLabel'
