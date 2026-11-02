<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FieldErrorTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), ...props }: FieldErrorTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-field-error-text' }, field?.()?.getErrorTextProps() ?? {}, props))
</script>

{#if field?.()?.invalid}
  <Ark as="span" bind:ref {...mergedProps} />
{/if}
