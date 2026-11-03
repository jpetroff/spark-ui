'use client'

import type { OptionItemProps } from '../../common/zag/menu/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { MenuItemProvider } from "./use-menu-item-context.ts";
import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";

type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

export interface MenuCheckboxItemBaseProps extends PartialOptionItemProps, PolymorphicProps {}
export interface MenuCheckboxItemProps extends HTMLProps<'div'>, MenuCheckboxItemBaseProps {}

const splitOptionItemProps = createSplitProps<PartialOptionItemProps>()

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>((props, ref) => {
  const [partialOptionItemProps, localProps] = splitOptionItemProps(props, [
    'checked',
    'closeOnSelect',
    'disabled',
    'onCheckedChange',
    'value',
    'valueText',
  ])
  const optionItemProps: OptionItemProps = {
    ...partialOptionItemProps,
    type: 'checkbox',
  }
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getOptionItemProps(optionItemProps), localProps)
  const optionItemState = menu.getOptionItemState(optionItemProps)

  return (
    <MenuItemPropsProvider value={optionItemProps}>
      <MenuItemProvider value={optionItemState}>
        <ark.div {...mergedProps} ref={ref} />
      </MenuItemProvider>
    </MenuItemPropsProvider>
  )
})

MenuCheckboxItem.displayName = 'MenuCheckboxItem'
