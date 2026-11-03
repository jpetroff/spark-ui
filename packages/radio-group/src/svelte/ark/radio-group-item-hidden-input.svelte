<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface RadioGroupItemHiddenInputProps extends Assign<
    HTMLProps<'input'>,
    RadioGroupItemHiddenInputBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useRadioGroupContext } from "./use-radio-group-context.ts";
  import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: RadioGroupItemHiddenInputProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemHiddenInputProps(itemProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
