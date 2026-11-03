<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface NumberInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NumberInputControlProps extends Assign<HTMLProps<'div'>, NumberInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useNumberInputContext } from "./use-number-input-context.ts";

  let { ref = $bindable(null), ...props }: NumberInputControlProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
