<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface CheckboxControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CheckboxControlProps extends Assign<HTMLProps<'div'>, CheckboxControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useCheckboxContext } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), ...props }: CheckboxControlProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-checkbox-control' }, checkbox().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
