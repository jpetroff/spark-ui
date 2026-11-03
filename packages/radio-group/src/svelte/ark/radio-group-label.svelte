<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface RadioGroupLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface RadioGroupLabelProps extends Assign<HTMLProps<'span'>, RadioGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useRadioGroupContext } from "./use-radio-group-context.ts";

  let { ref = $bindable(null), ...props }: RadioGroupLabelProps = $props()
  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
