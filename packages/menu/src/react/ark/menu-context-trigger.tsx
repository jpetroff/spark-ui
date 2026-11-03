'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";

export interface MenuContextTriggerBaseProps extends PolymorphicProps {}
export interface MenuContextTriggerProps extends HTMLProps<'button'>, MenuContextTriggerBaseProps {}

export const MenuContextTrigger = forwardRef<HTMLButtonElement, MenuContextTriggerProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getContextTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

MenuContextTrigger.displayName = 'MenuContextTrigger'
