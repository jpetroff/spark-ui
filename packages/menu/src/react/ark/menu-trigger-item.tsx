'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuTriggerItemContext } from "./use-menu-trigger-item-context.ts";
import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";

export interface MenuTriggerItemBaseProps extends PolymorphicProps {}
export interface MenuTriggerItemProps extends HTMLProps<'div'>, MenuTriggerItemBaseProps {}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>((props, ref) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(getTriggerItemProps?.() ?? {}, props)

  return (
    <MenuItemPropsProvider value={{ value: (mergedProps as any)['data-value'] }}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemPropsProvider>
  )
})

MenuTriggerItem.displayName = 'MenuTriggerItem'
