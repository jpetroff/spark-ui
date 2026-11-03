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
import { type UseSelectProps } from "./use-select.ts";
import { useSelect } from "./use-select.ts";
import { SelectProvider } from "./use-select-context.ts";

export interface SelectRootBaseProps<T extends CollectionItem>
  extends UseSelectProps<T>, UsePresenceProps, PolymorphicProps {}
export interface SelectRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}

const SelectImpl = <T extends CollectionItem>(props: SelectRootProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
    'closeOnSelect',
    'collection',
    'composite',
    'defaultHighlightedValue',
    'defaultOpen',
    'defaultValue',
    'deselectable',
    'disabled',
    'form',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
    'loopFocus',
    'multiple',
    'name',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'onValueChange',
    'open',
    'positioning',
    'readOnly',
    'required',
    'scrollToIndexFn',
    'translations',
    'autoComplete',
    'value',
  ])
  const select = useSelect(useSelectProps)
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

export type SelectRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  SelectRootProps<T>,
  P
> &
  React.RefAttributes<HTMLDivElement>

export type SelectRootComponent<P = {}> = <T extends CollectionItem>(
  props: SelectRootComponentProps<T, P>,
) => JSX.Element

export const SelectRoot = forwardRef(SelectImpl) as SelectRootComponent
