<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";
  import type { UseSelectReturn } from "./use-select.svelte.ts";

  export interface SelectRootProviderBaseProps<T extends CollectionItem = CollectionItem>
    extends PolymorphicProps<'div'>, UsePresenceProps, RefAttribute {
    value: UseSelectReturn<T>
  }

  export interface SelectRootProviderProps<T extends CollectionItem = CollectionItem> extends Assign<
    HTMLProps<'div'>,
    SelectRootProviderBaseProps<T>
  > {}

  export type SelectRootProviderComponent<P = {}> = <T extends CollectionItem>(
    props: Assign<SelectRootProviderProps<T>, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { SelectProvider } from "./use-select-context.ts";
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
import { type UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { Snippet } from 'svelte'

  let { ref = $bindable(null), ...props }: SelectRootProviderProps<T> = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: props.value().open, ...presenceProps }))

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), localProps))

  SelectProvider(() => props.value())
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
