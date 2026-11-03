<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { TriggerProps } from '../../common/zag/menu/index.ts'

  export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { useMenuTriggerItemContext } from "./use-menu-trigger-item-context.ts";

  let { ref = $bindable(null), ...props }: MenuTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const menu = useMenuContext()
  const triggerItemProps = useMenuTriggerItemContext()

  const mergedProps = $derived(mergeProps(menu().getTriggerProps(triggerProps), triggerItemProps?.() || {}, localProps))
</script>

<Ark as="button" bind:ref data-scope="menu" data-part="trigger" {...mergedProps} />
