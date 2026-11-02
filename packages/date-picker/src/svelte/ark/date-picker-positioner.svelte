<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerPositionerProps extends Assign<HTMLProps<'div'>, DatePickerPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerPositionerProps = $props()

  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-positioner' }, datePicker().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
