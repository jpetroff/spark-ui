<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface NumberInputScrubberBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NumberInputScrubberProps extends Assign<HTMLProps<'div'>, NumberInputScrubberBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useNumberInputContext } from "./use-number-input-context.ts";

  let { ref = $bindable(null), ...props }: NumberInputScrubberProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getScrubberProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
