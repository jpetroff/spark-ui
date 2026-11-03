<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ItemGroupProps } from '../../common/zag/menu/index.ts'

  type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

  export interface MenuItemGroupBaseProps extends OptionalItemGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemGroupProps extends Assign<HTMLProps<'div'>, MenuItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { MenuItemGroupProvider } from "./use-menu-item-group-context.ts";

  let { ref = $bindable(null), ...props }: MenuItemGroupProps = $props()

  const menu = useMenuContext()
  const id = $props.id()
  const itemGroupProps = $derived({ id, ...props })
  const mergedProps = $derived(mergeProps(menu().getItemGroupProps(itemGroupProps), props))

  MenuItemGroupProvider(() => itemGroupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
