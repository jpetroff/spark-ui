<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerTableBodyBaseProps extends PolymorphicProps<'tbody'>, RefAttribute {}
  export interface DatePickerTableBodyProps extends Assign<HTMLProps<'tbody'>, DatePickerTableBodyBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerTableBodyProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-table-body' }, datePicker().getTableBodyProps(), props))
</script>

<Ark as="tbody" bind:ref {...mergedProps} />
