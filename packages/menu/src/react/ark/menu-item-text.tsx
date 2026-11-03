'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { useMenuItemPropsContext } from "./use-menu-option-item-props-context.ts";

export interface MenuItemTextBaseProps extends PolymorphicProps {}
export interface MenuItemTextProps extends HTMLProps<'div'>, MenuItemTextBaseProps {}

export const MenuItemText = forwardRef<HTMLDivElement, MenuItemTextProps>((props, ref) => {
  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = mergeProps(menu.getItemTextProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemText.displayName = 'MenuItemText'
