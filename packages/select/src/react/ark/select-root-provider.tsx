'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { type JSX, forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import type { CollectionItem } from "@spark/collection/react/ark/list-collection.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { type UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import type { UseSelectReturn } from "./use-select.ts";
import { SelectProvider } from "./use-select-context.ts";

interface RootProviderProps<T extends CollectionItem> {
  value: UseSelectReturn<T>
}
export interface SelectRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps {}
export interface SelectRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, SelectRootProviderBaseProps<T> {}

const SelectImpl = <T extends CollectionItem>(props: SelectRootProviderProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [{ value: select }, localProps] = createSplitProps<RootProviderProps<T>>()(selectProps, ['value'])
  const presence = usePresence(mergeProps({ present: select.open }, presenceProps))
  const mergedProps = mergeProps(select.getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </SelectProvider>
  )
}

export type SelectRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<SelectRootProviderProps<T>, P> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const SelectRootProvider = forwardRef(SelectImpl) as SelectRootProviderComponent
