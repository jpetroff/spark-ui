<script module lang="ts">
  import type { InputProps } from '../../common/zag/date-picker/index.ts'
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps<'input'>, RefAttribute {}
  export interface DatePickerInputProps extends Assign<HTMLProps<'input'>, DatePickerInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { ref = $bindable(null), ...props }: DatePickerInputProps = $props()

  const [inputProps, localProps] = $derived(createSplitProps<InputProps>()(props, ['index', 'fixOnBlur']))
  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-input' }, datePicker().getInputProps(inputProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />
