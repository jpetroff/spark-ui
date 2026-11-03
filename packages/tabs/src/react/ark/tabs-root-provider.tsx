'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type RenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { RenderStrategyPropsProvider } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseTabsReturn } from "./use-tabs.ts";
import { TabsProvider } from "./use-tabs-context.ts";

interface RootProviderProps {
  value: UseTabsReturn
}

export interface TabsRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProviderProps extends HTMLProps<'div'>, TabsRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const TabsRootProvider = forwardRef<HTMLDivElement, TabsRootProviderProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [{ value: tabs }, localProps] = splitRootProviderProps(tabsProps, ['value'])
  const mergedProps = mergeProps(tabs.getRootProps(), localProps)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TabsProvider>
  )
})

TabsRootProvider.displayName = 'TabsRootProvider'
