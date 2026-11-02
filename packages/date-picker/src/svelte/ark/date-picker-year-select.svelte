<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerYearSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface DatePickerYearSelectProps extends Assign<HTMLProps<'select'>, DatePickerYearSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerYearSelectProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-year-select' }, datePicker().getYearSelectProps(), props))
</script>

<Ark as="select" bind:ref {...mergedProps}>
  {#each datePicker().getYears() as year, i}
    <option value={year.value}>
      {year.label}
    </option>
  {/each}
</Ark>
