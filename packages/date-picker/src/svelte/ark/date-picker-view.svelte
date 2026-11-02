<script module lang="ts">
  import type { ViewProps } from '../../common/zag/date-picker/index.ts'
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerViewBaseProps extends ViewProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerViewProps extends Assign<HTMLProps<'div'>, DatePickerViewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";
  import { DatePickerViewPropsProvider } from "./use-date-picker-view-props-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerViewProps = $props()

  const [viewProps, localProps] = $derived(createSplitProps<ViewProps>()(props, ['view']))
  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewProps(viewProps), localProps))

  DatePickerViewPropsProvider(() => viewProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
