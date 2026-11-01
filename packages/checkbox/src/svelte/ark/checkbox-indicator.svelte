<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface CheckboxIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    indeterminate?: boolean
  }
  export interface CheckboxIndicatorProps extends Assign<HTMLProps<'div'>, CheckboxIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useCheckboxContext } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), indeterminate, ...rest }: CheckboxIndicatorProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), rest))
  const isVisible = $derived(indeterminate ? checkbox().indeterminate : checkbox().checked)
</script>

<Ark as="div" bind:ref {...mergedProps} hidden={!isVisible} />
