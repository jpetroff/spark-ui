<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    placeholder?: string
  }
  export interface SelectValueTextProps extends Assign<HTMLProps<'span'>, SelectValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), placeholder, children, ...props }: SelectValueTextProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {select().valueAsString || placeholder}
  {/if}
</Ark>
