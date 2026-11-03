'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ItemProps } from '../../common/zag/select/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";
import { SelectItemProvider } from "./use-select-item-context.ts";
import { SelectItemPropsProvider } from "./use-select-item-props-context.ts";

export interface SelectItemBaseProps extends ItemProps, PolymorphicProps {}
export interface SelectItemProps extends HTMLProps<'div'>, SelectItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['item', 'persistFocus'])
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getItemProps(itemProps), localProps)
  const itemState = select.getItemState(itemProps)

  return (
    <SelectItemPropsProvider value={itemProps}>
      <SelectItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} />
      </SelectItemProvider>
    </SelectItemPropsProvider>
  )
})

SelectItem.displayName = 'SelectItem'
