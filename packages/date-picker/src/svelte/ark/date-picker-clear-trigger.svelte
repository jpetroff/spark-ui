<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DatePickerClearTriggerProps extends Assign<HTMLProps<'button'>, DatePickerClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerClearTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-clear-trigger' }, datePicker().getClearTriggerProps(), props))
</script>

<Ark bind:ref as="button" {...mergedProps} />
