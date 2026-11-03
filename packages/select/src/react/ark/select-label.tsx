'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectLabelBaseProps extends PolymorphicProps {}
export interface SelectLabelProps extends HTMLProps<'label'>, SelectLabelBaseProps {}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

SelectLabel.displayName = 'SelectLabel'
