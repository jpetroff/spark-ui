'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useMenuContext } from "./use-menu-context.ts";

export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps extends HTMLProps<'div'>, MenuContentBaseProps {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(menu.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

MenuContent.displayName = 'MenuContent'
