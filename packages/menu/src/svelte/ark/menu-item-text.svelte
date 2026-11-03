<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuItemTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemTextProps extends Assign<HTMLProps<'div'>, MenuItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { useMenuItemPropsContext } from "./use-menu-option-item-props-context.ts";

  let { ref = $bindable(null), ...props }: MenuItemTextProps = $props()

  const menu = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  const mergedProps = $derived(mergeProps(menu().getItemTextProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
