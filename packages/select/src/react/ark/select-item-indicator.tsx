'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";
import { useSelectItemPropsContext } from "./use-select-item-props-context.ts";

export interface SelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface SelectItemIndicatorProps extends HTMLProps<'div'>, SelectItemIndicatorBaseProps {}

export const SelectItemIndicator = forwardRef<HTMLDivElement, SelectItemIndicatorProps>((props, ref) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(select.getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectItemIndicator.displayName = 'SelectItemIndicator'
