'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef, useId } from 'react'
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { MenuItemGroupProvider } from "./use-menu-item-group-context.ts";
import { type UseMenuItemGroupContext } from "./use-menu-item-group-context.ts";

type OptionalUseMenuItemGroupContext = Optional<UseMenuItemGroupContext, 'id'>

export interface MenuRadioItemGroupBaseProps extends OptionalUseMenuItemGroupContext, PolymorphicProps {}
export interface MenuRadioItemGroupProps extends HTMLProps<'div'>, MenuRadioItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<OptionalUseMenuItemGroupContext>()

export const MenuRadioItemGroup = forwardRef<HTMLDivElement, MenuRadioItemGroupProps>((props, ref) => {
  const [optionalItemGroupProps, localProps] = splitItemGroupProps(props, ['id', 'onValueChange', 'value'])
  const menu = useMenuContext()
  const id = useId()
  const itemGroupProps = { id, ...optionalItemGroupProps }
  const mergedProps = mergeProps(menu.getItemGroupProps({ id: itemGroupProps.id }), localProps)

  return (
    <MenuItemGroupProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemGroupProvider>
  )
})

MenuRadioItemGroup.displayName = 'MenuRadioItemGroup'
