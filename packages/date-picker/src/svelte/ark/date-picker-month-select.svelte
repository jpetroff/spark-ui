<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface DatePickerMonthSelectProps extends Assign<HTMLProps<'select'>, DatePickerMonthSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerMonthSelectProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getMonthSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each datePicker().getMonths() as month, i}
    <option value={month.value}>
      {month.label}
    </option>
  {/each}
</Ark>
