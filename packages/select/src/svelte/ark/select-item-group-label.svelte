<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectItemGroupLabelBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectItemGroupLabelProps extends Assign<HTMLProps<'div'>, SelectItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";
  import { useSelectItemGroupPropsContext } from "./use-select-item-group-props-context.ts";

  let { ref = $bindable(null), ...props }: SelectItemGroupLabelProps = $props()

  const select = useSelectContext()
  const groupProps = useSelectItemGroupPropsContext()

  const mergedProps = $derived(mergeProps(select().getItemGroupLabelProps({ htmlFor: groupProps().id }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
