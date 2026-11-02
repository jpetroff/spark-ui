<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerTableCellTriggerProps extends Assign<
    HTMLProps<'div'>,
    DatePickerTableCellTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { useDatePickerTableCellPropsContext } from "./use-date-picker-table-cell-props-context.ts";
  import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerTableCellTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const cellProps = useDatePickerTableCellPropsContext()
  const viewProps = useDatePickerViewPropsContext()

  const triggerProps = $derived.by(() => {
    const viewMap = {
      day: datePicker().getDayTableCellTriggerProps,
      month: datePicker().getMonthTableCellTriggerProps,
      year: datePicker().getYearTableCellTriggerProps,
    }

    // @ts-expect-error fix later
    const viewFn = viewMap[viewProps().view]

    return viewFn(cellProps())
  })

  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-table-cell-trigger' }, triggerProps, props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
