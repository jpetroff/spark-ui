'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { useMenuItemGroupContext } from "./use-menu-item-group-context.ts";

export interface MenuItemGroupLabelBaseProps extends PolymorphicProps {}
export interface MenuItemGroupLabelProps extends HTMLProps<'div'>, MenuItemGroupLabelBaseProps {}

export const MenuItemGroupLabel = forwardRef<HTMLDivElement, MenuItemGroupLabelProps>((props, ref) => {
  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()
  const mergedProps = mergeProps(menu.getItemGroupLabelProps({ htmlFor: itemGroup.id }), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemGroupLabel.displayName = 'MenuItemGroupLabel'
