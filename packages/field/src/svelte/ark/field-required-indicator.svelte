<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";
  import type { Snippet } from 'svelte'

  export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    fallback?: Snippet
  }
  export interface FieldRequiredIndicatorProps extends Assign<HTMLProps<'span'>, FieldRequiredIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), ...props }: FieldRequiredIndicatorProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getRequiredIndicatorProps() ?? {}, props))
</script>

{#if field?.()?.required}
  <Ark as="span" bind:ref {...mergedProps}>
    {#if props.children}
      {@render props.children?.()}
    {:else}
      *
    {/if}
  </Ark>
{:else}
  {@render props.fallback?.()}
{/if}
