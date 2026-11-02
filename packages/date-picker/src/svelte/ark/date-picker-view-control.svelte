<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerViewControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerViewControlProps extends Assign<HTMLProps<'div'>, DatePickerViewControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerViewControlProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewControlProps(viewProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
