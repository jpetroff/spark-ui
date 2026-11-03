'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { TriggerProps } from '../../common/zag/menu/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useMenuContext } from "./use-menu-context.ts";

export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const menu = useMenuContext()
  const presence = usePresenceContext()
  const triggerPropsRaw = menu.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

MenuTrigger.displayName = 'MenuTrigger'
