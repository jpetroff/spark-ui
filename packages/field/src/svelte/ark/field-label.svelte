<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FieldLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface FieldLabelProps extends Assign<HTMLProps<'label'>, FieldLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), ...props }: FieldLabelProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-field-label' }, field?.()?.getLabelProps() ?? {}, props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
