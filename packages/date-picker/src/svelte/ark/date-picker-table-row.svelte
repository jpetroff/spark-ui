<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerTableRowBaseProps extends PolymorphicProps<'tr'>, RefAttribute {}
  export interface DatePickerTableRowProps extends Assign<HTMLProps<'tr'>, DatePickerTableRowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { useDatePickerTablePropsContext } from "./use-date-picker-table-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerTableRowProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-table-row' }, datePicker().getTableRowProps(tableProps()), props))
</script>

<Ark as="tr" bind:ref {...mergedProps} />
