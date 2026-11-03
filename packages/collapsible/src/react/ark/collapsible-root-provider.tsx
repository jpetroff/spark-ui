'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseCollapsibleReturn } from "./use-collapsible.ts";
import { CollapsibleProvider } from "./use-collapsible-context.ts";

interface RootProviderProps {
  value: UseCollapsibleReturn
}

export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CollapsibleRootProviderProps extends HTMLProps<'div'>, CollapsibleRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const CollapsibleRootProvider = forwardRef<HTMLDivElement, CollapsibleRootProviderProps>((props, ref) => {
  const [{ value: collapsible }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(collapsible.getRootProps(), localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRootProvider.displayName = 'CollapsibleRootProvider'
