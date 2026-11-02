<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerTableHeadBaseProps extends PolymorphicProps<'thead'>, RefAttribute {}
  export interface DatePickerTableHeadProps extends Assign<HTMLProps<'thead'>, DatePickerTableHeadBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { useDatePickerTablePropsContext } from "./use-date-picker-table-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerTableHeadProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps(datePicker().getTableHeadProps(tableProps()), props))
</script>

<Ark as="thead" bind:ref {...mergedProps} />
