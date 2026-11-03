'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ItemGroupProps } from '../../common/zag/select/index.ts'
import { forwardRef, useId } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";
import { SelectItemGroupPropsProvider } from "./use-select-item-group-props.tsx";

export interface SelectItemGroupBaseProps extends PolymorphicProps {}
export interface SelectItemGroupProps extends HTMLProps<'div'>, SelectItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<Partial<ItemGroupProps>>()

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>((props, ref) => {
  const id = useId()
  const [_itemGroupProps, localProps] = splitItemGroupProps(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const select = useSelectContext()
  const mergedProps = mergeProps(select.getItemGroupProps(itemGroupProps), localProps)

  return (
    <SelectItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </SelectItemGroupPropsProvider>
  )
})

SelectItemGroup.displayName = 'SelectItemGroup'
