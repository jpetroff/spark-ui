<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface CheckboxControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CheckboxControlProps extends Assign<HTMLProps<'div'>, CheckboxControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useCheckboxContext } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), ...props }: CheckboxControlProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
