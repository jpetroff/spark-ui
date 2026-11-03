<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface NumberInputDecrementTriggerProps extends Assign<
    HTMLProps<'button'>,
    NumberInputDecrementTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useNumberInputContext } from "./use-number-input-context.ts";

  let { ref = $bindable(null), ...props }: NumberInputDecrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getDecrementTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
