'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";
import { useSelectItemGroupPropsContext } from "./use-select-item-group-props.tsx";

export interface SelectItemGroupLabelBaseProps extends PolymorphicProps {}
export interface SelectItemGroupLabelProps extends HTMLProps<'div'>, SelectItemGroupLabelBaseProps {}

export const SelectItemGroupLabel = forwardRef<HTMLDivElement, SelectItemGroupLabelProps>((props, ref) => {
  const select = useSelectContext()
  const itemGroupProps = useSelectItemGroupPropsContext()
  const mergedProps = mergeProps(select.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectItemGroupLabel.displayName = 'SelectItemGroupLabel'
