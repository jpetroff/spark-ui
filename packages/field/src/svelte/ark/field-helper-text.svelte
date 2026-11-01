<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FieldHelperTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldHelperTextProps extends Assign<HTMLProps<'span'>, FieldHelperTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), ...props }: FieldHelperTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getHelperTextProps() ?? {}, props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
