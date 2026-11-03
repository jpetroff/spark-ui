<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface NumberInputValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberInputValueTextProps extends Assign<HTMLProps<'span'>, NumberInputValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useNumberInputContext } from "./use-number-input-context.ts";

  let { ref = $bindable(null), children, ...props }: NumberInputValueTextProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {numberInput().value}
  {/if}
</Ark>
