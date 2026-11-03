<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface RadioGroupItemControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupItemControlProps extends Assign<HTMLProps<'div'>, RadioGroupItemControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useRadioGroupContext } from "./use-radio-group-context.ts";
  import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: RadioGroupItemControlProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemControlProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
