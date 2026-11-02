<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerViewTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DatePickerViewTriggerProps extends Assign<HTMLProps<'button'>, DatePickerViewTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { useDatePickerViewPropsContext } from "./use-date-picker-view-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerViewTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewTriggerProps(viewProps()), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
