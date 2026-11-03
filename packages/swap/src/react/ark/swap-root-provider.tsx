'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseSwapReturn } from "./use-swap.ts";
import { SwapProvider } from "./use-swap-context.ts";

export interface SwapRootProviderBaseProps extends PolymorphicProps {
  value: UseSwapReturn
}

export interface SwapRootProviderProps extends HTMLProps<'span'>, SwapRootProviderBaseProps {}

export const SwapRootProvider = forwardRef<HTMLSpanElement, SwapRootProviderProps>((props, ref) => {
  const { value, children, ...restProps } = props
  const mergedProps = mergeProps(value.getRootProps(), restProps)

  return (
    <SwapProvider value={value}>
      <ark.span {...mergedProps} ref={ref}>
        {children}
      </ark.span>
    </SwapProvider>
  )
})

SwapRootProvider.displayName = 'SwapRootProvider'
