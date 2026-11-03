'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { CollapsibleGate } from "./collapsible-gate.tsx";
import { useCollapsibleContext } from "./use-collapsible-context.ts";

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps extends HTMLProps<'div'>, CollapsibleContentBaseProps {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>((props, ref) => {
  const collapsible = useCollapsibleContext()

  const mergedProps = mergeProps(
    collapsible.getContentProps(),
    collapsible.hideMode === 'activity' ? { hidden: false } : {},
    props,
  )

  return (
    <CollapsibleGate collapsible={collapsible}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleGate>
  )
})

CollapsibleContent.displayName = 'CollapsibleContent'
