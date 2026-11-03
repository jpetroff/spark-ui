'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ContentProps } from '../../common/zag/tabs/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { useRenderStrategyPropsContext } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceGate } from "@spark/presence/react/ark/presence-gate.tsx";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { useTabsContext } from "./use-tabs-context.ts";

export interface TabContentBaseProps extends ContentProps, PolymorphicProps {}
export interface TabContentProps extends HTMLProps<'div'>, TabContentBaseProps {}

const splitContentProps = createSplitProps<ContentProps>()

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const [contentProps, localProps] = splitContentProps(props, ['value'])
  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence({
    ...renderStrategyProps,
    present: tabs.value === props.value,
    immediate: true,
  })

  const mergedProps = mergeProps(tabs.getContentProps(contentProps), presence.getPresenceProps(), localProps)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceProvider value={presence}>
      <PresenceGate presence={presence}>
        <ark.div {...mergedProps} ref={composedRefs} />
      </PresenceGate>
    </PresenceProvider>
  )
})

TabContent.displayName = 'TabContent'
