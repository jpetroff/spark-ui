'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseScrollAreaReturn } from "./use-scroll-area.ts";
import { ScrollAreaProvider } from "./use-scroll-area-context.ts";

interface RootProviderProps {
  value: UseScrollAreaReturn
}

export interface ScrollAreaRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ScrollAreaRootProviderProps extends HTMLProps<'div'>, ScrollAreaRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ScrollAreaRootProvider = forwardRef<HTMLDivElement, ScrollAreaRootProviderProps>((props, ref) => {
  const [{ value: scrollArea }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(scrollArea.getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaProvider>
  )
})

ScrollAreaRootProvider.displayName = 'ScrollAreaRootProvider'
