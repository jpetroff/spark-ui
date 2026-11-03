<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { Snippet } from 'svelte'

  export interface ToggleIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    /**
     * The fallback content to render when the toggle is not pressed.
     */
    fallback?: Snippet
  }

  export interface ToggleIndicatorProps extends Assign<HTMLProps<'span'>, ToggleIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToggleContext } from "./use-toggle-context.ts";

  let { ref = $bindable(null), children, fallback, ...props }: ToggleIndicatorProps = $props()

  const toggle = useToggleContext()
  const mergedProps = $derived(mergeProps(toggle().getIndicatorProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if toggle().pressed}
    {@render children?.()}
  {:else if fallback}
    {@render fallback()}
  {/if}
</Ark>
