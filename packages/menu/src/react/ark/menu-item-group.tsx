'use client'

import type { ItemGroupProps } from '../../common/zag/menu/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef, useId } from 'react'
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { MenuItemGroupProvider } from "./use-menu-item-group-context.ts";

type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

export interface MenuItemGroupBaseProps extends OptionalItemGroupProps, PolymorphicProps {}
export interface MenuItemGroupProps extends HTMLProps<'div'>, MenuItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<OptionalItemGroupProps>()

export const MenuItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>((props, ref) => {
  const [optionalItemGroupProps, localProps] = splitItemGroupProps(props, ['id'])
  const menu = useMenuContext()
  const id = useId()
  const itemGroupProps = { id, ...optionalItemGroupProps }
  const mergedProps = mergeProps(menu.getItemGroupProps(itemGroupProps), localProps)

  return (
    <MenuItemGroupProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemGroupProvider>
  )
})

MenuItemGroup.displayName = 'MenuItemGroup'
