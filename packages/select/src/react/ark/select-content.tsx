'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectContentBaseProps extends PolymorphicProps {}
export interface SelectContentProps extends HTMLProps<'div'>, SelectContentBaseProps {}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(select.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

SelectContent.displayName = 'SelectContent'
