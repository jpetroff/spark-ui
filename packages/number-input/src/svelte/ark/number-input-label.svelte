<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface NumberInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface NumberInputLabelProps extends Assign<HTMLProps<'label'>, NumberInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useNumberInputContext } from "./use-number-input-context.ts";

  let { ref = $bindable(null), ...props }: NumberInputLabelProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
