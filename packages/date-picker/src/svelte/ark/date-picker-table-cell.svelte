<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseDatePickerTableCellPropsContext } from "./use-date-picker-table-cell-props-context.ts";

  export interface DatePickerTableCellBaseProps
    extends ReturnType<UseDatePickerTableCellPropsContext>, PolymorphicProps<'td'>, RefAttribute {}
  export interface DatePickerTableCellProps extends Assign<HTMLProps<'td'>, DatePickerTableCellBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { DatePickerTableCellPropsProvider } from "./use-date-picker-table-cell-props-context.ts";
  import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerTableCellProps = $props()

  const [cellProps, localProps] = $derived(
    createSplitProps<ReturnType<UseDatePickerTableCellPropsContext>>()(props, [
      'disabled',
      'value',
      'visibleRange',
      'columns',
    ]),
  )

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()

  const tableCellProps = $derived(() => {
    const viewMap = {
      day: datePicker().getDayTableCellProps,
      month: datePicker().getMonthTableCellProps,
      year: datePicker().getYearTableCellProps,
    }

    // @ts-expect-error value is number filter
    return viewMap[viewProps().view](cellProps)
  })

  const mergedProps = $derived(mergeProps(tableCellProps, localProps))

  DatePickerTableCellPropsProvider(() => cellProps)
</script>

<Ark as="td" bind:ref {...mergedProps} />
