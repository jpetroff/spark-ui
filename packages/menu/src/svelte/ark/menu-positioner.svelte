<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuPositionerProps extends Assign<HTMLProps<'div'>, MenuPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useMenuContext } from "./use-menu-context.ts";

  let { ref = $bindable(null), ...props }: MenuPositionerProps = $props()

  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(menu().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
