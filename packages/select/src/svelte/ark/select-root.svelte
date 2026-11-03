<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";
  import type { UseSelectProps } from "./use-select.svelte.ts";

  export interface SelectRootBaseProps<T extends CollectionItem = CollectionItem>
    extends UseSelectProps<T>, UsePresenceProps, PolymorphicProps<'div'>, RefAttribute {}

  export interface SelectRootProps<T extends CollectionItem = CollectionItem> extends Assign<
    HTMLProps<'div'>,
    SelectRootBaseProps<T>
  > {}

  export type SelectRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
    SelectRootProps<T>,
    P
  >

  export type SelectRootComponent<P = {}> = <T extends CollectionItem>(props: SelectRootComponentProps<T, P>) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
import { type UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { SelectProvider } from "./use-select-context.ts";
  import { useSelect } from "./use-select.svelte.ts";

  let {
    ref = $bindable(null),
    value = $bindable<string[] | undefined>(),
    open = $bindable<boolean>(),
    highlightedValue = $bindable<string | null>(),
    ...props
  }: SelectRootProps<T> = $props()

  const [presenceProps, selectProps] = $derived(splitPresenceProps(props))
  const [useSelectProps, localProps] = $derived(
    createSplitProps<UseSelectProps<T>>()(selectProps, [
      'autoComplete',
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
      'value',
    ]),
  )

  const providedId = $props.id()
  const machineProps = $derived.by<UseSelectProps<T>>(() => ({
    ...useSelectProps,
    id: props.id ?? providedId,
    value,
    open,
    highlightedValue,
    onValueChange(details) {
      useSelectProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
    onOpenChange(details) {
      useSelectProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    onHighlightChange(details) {
      useSelectProps.onHighlightChange?.(details)
      if (highlightedValue !== undefined) highlightedValue = details.highlightedValue
    },
  }))

  const select = useSelect(() => machineProps)
  const presence = usePresence(() => ({ present: select().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(select().getRootProps(), localProps))

  SelectProvider(select)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
