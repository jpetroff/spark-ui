'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectIndicatorBaseProps extends PolymorphicProps {}
export interface SelectIndicatorProps extends HTMLProps<'div'>, SelectIndicatorBaseProps {}

export const SelectIndicator = forwardRef<HTMLDivElement, SelectIndicatorProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectIndicator.displayName = 'SelectIndicator'
