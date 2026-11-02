<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerContentProps extends Assign<HTMLProps<'div'>, DatePickerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerContentProps = $props()

  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(datePicker().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
