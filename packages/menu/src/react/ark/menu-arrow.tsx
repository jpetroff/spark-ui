'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useMenuContext } from "./use-menu-context.ts";

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps extends HTMLProps<'div'>, MenuArrowBaseProps {}

export const MenuArrow = forwardRef<HTMLDivElement, MenuArrowProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrow.displayName = 'MenuArrow'
