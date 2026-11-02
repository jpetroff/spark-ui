<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { DateValue } from '../../common/zag/date-picker/index.ts'

  export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps<'td'>, RefAttribute {
    weekIndex: number
    week: DateValue[]
  }
  export interface DatePickerWeekNumberCellProps extends Assign<HTMLProps<'td'>, DatePickerWeekNumberCellBaseProps> {}
</script>

<script lang="ts">
  import type { WeekNumberCellProps } from '../../common/zag/date-picker/index.ts'
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerWeekNumberCellProps = $props()

  const [cellProps, localProps] = $derived(createSplitProps<WeekNumberCellProps>()(props, ['weekIndex', 'week']))

  const datePicker = useDatePickerContext()

  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-week-number-cell' }, datePicker().getWeekNumberCellProps(cellProps), localProps))
</script>

<Ark as="td" bind:ref {...mergedProps} />
