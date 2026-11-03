<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface RadioGroupItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface RadioGroupItemTextProps extends Assign<HTMLProps<'span'>, RadioGroupItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useRadioGroupContext } from "./use-radio-group-context.ts";
  import { useRadioGroupItemPropsContext } from "./use-radio-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: RadioGroupItemTextProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
