<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface CheckboxHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface CheckboxHiddenInputProps extends Assign<HTMLProps<'input'>, CheckboxHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";
  import { useCheckboxContext } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), ...props }: CheckboxHiddenInputProps = $props()

  const checkbox = useCheckboxContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(checkbox().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
