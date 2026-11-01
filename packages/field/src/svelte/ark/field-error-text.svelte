<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface FieldErrorTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), ...props }: FieldErrorTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getErrorTextProps() ?? {}, props))
</script>

{#if field?.()?.invalid}
  <Ark as="span" bind:ref {...mergedProps} />
{/if}
