<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuContextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";

  let { ref = $bindable(null), ...props }: MenuContextTriggerProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getContextTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
