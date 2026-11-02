<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerTableBaseProps extends PolymorphicProps<'table'> {
    columns?: number
  }
  export interface DatePickerTableProps extends Assign<HTMLProps<'table'>, DatePickerTableBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { DatePickerTablePropsProvider } from "./use-date-picker-table-props-context.ts";
  import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

  const { columns, ...localProps }: DatePickerTableProps = $props()
  const providedId = $props.id()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()

  const tableProps = $derived({ id: providedId, columns, ...viewProps() })
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-table' }, datePicker().getTableProps(tableProps), localProps))

  DatePickerTablePropsProvider(() => tableProps)
</script>

<Ark as="table" {...mergedProps} />
