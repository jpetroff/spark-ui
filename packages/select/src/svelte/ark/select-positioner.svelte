<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectPositionerProps extends Assign<HTMLProps<'div'>, SelectPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), ...props }: SelectPositionerProps = $props()
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(select().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
