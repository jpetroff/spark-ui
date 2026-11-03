<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface SelectTriggerProps extends Assign<HTMLProps<'button'>, SelectTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), ...props }: SelectTriggerProps = $props()
  const select = useSelectContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(select().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
