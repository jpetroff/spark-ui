<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface SelectClearTriggerProps extends Assign<HTMLProps<'button'>, SelectClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), ...props }: SelectClearTriggerProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
