<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuItemGroupLabelBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemGroupLabelProps extends Assign<HTMLProps<'div'>, MenuItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { useMenuItemGroupContext } from "./use-menu-item-group-context.ts";

  let { ref = $bindable(null), ...props }: MenuItemGroupLabelProps = $props()

  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()
  const mergedProps = $derived(mergeProps(menu().getItemGroupLabelProps({ htmlFor: itemGroup().id }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
