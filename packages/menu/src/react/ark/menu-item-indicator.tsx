'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { useMenuItemPropsContext } from "./use-menu-option-item-props-context.ts";

export interface MenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface MenuItemIndicatorProps extends HTMLProps<'div'>, MenuItemIndicatorBaseProps {}

export const MenuItemIndicator = forwardRef<HTMLDivElement, MenuItemIndicatorProps>((props, ref) => {
  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = mergeProps(menu.getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemIndicator.displayName = 'MenuItemIndicator'
