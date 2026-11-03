'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { useSwapContext } from "./use-swap-context.ts";

export interface SwapIndicatorBaseProps extends PolymorphicProps {
  type: 'on' | 'off'
}

export interface SwapIndicatorProps extends HTMLProps<'span'>, SwapIndicatorBaseProps {}

export const SwapIndicator = forwardRef<HTMLSpanElement, SwapIndicatorProps>((props, ref) => {
  const { type, ...restProps } = props
  const swap = useSwapContext()
  const presence = type === 'on' ? swap.onPresence : swap.offPresence
  const composedRefs = useComposedRefs(presence.ref, ref)
  const mergedProps = mergeProps(swap.getIndicatorProps({ type }), restProps)

  return (
    <PresenceGate presence={presence}>
      <ark.span {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

SwapIndicator.displayName = 'SwapIndicator'
