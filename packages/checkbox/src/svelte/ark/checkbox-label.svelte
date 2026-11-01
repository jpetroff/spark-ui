<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface CheckboxLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface CheckboxLabelProps extends Assign<HTMLProps<'span'>, CheckboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useCheckboxContext } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), ...props }: CheckboxLabelProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
