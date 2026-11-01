'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useCheckboxContext } from "./use-checkbox-context.ts";

export interface CheckboxControlBaseProps extends PolymorphicProps {}
export interface CheckboxControlProps extends HTMLProps<'div'>, CheckboxControlBaseProps {}

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(checkbox.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CheckboxControl.displayName = 'CheckboxControl'
