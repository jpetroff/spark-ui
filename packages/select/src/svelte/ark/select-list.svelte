<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectListProps extends Assign<HTMLProps<'div'>, SelectListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), ...props }: SelectListProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
