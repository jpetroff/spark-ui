<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuTriggerItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuTriggerItemProps extends Assign<HTMLProps<'div'>, MenuTriggerItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuTriggerItemContext } from "./use-menu-trigger-item-context.ts";
  import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";

  let { ref = $bindable(null), ...props }: MenuTriggerItemProps = $props()

  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = $derived(mergeProps(getTriggerItemProps?.() ?? {}, props))

  MenuItemPropsProvider(() => ({ value: mergedProps['data-value'] }))
</script>

<Ark as="div" bind:ref {...mergedProps} />
