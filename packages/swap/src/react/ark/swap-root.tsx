'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseSwapProps } from "./use-swap.ts";
import { useSwap } from "./use-swap.ts";
import { SwapProvider } from "./use-swap-context.ts";

export interface SwapRootBaseProps extends UseSwapProps, PolymorphicProps {}

export interface SwapRootProps extends HTMLProps<'span'>, SwapRootBaseProps {}

export const SwapRoot = forwardRef<HTMLSpanElement, SwapRootProps>((props, ref) => {
  const { children, swap: swapProp, lazyMount, unmountOnExit, hideMode, ...restProps } = props
  const swap = useSwap({ swap: swapProp, lazyMount, unmountOnExit, hideMode })
  const mergedProps = mergeProps(swap.getRootProps(), restProps)

  return (
    <SwapProvider value={swap}>
      <ark.span {...mergedProps} ref={ref}>
        {children}
      </ark.span>
    </SwapProvider>
  )
})

SwapRoot.displayName = 'SwapRoot'
