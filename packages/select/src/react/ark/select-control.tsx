'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectControlBaseProps extends PolymorphicProps {}
export interface SelectControlProps extends HTMLProps<'div'>, SelectControlBaseProps {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})
SelectControl.displayName = 'SelectControl'
