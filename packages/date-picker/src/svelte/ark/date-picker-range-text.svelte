<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerRangeTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerRangeTextProps extends Assign<HTMLProps<'div'>, DatePickerRangeTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { uniq } from '@spark/shared/common/zag/utils/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerRangeTextProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getRangeTextProps(), props))

  const visibleRangeText = $derived.by(() => {
    const { start, end } = datePicker().visibleRangeText
    return uniq([start, end]).filter(Boolean).join(' - ')
  })
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {visibleRangeText}
</Ark>
