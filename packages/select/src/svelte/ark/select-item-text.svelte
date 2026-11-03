<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SelectItemTextProps extends Assign<HTMLProps<'span'>, SelectItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";
  import { useSelectItemPropsContext } from "./use-select-item-props-context.ts";

  let { ref = $bindable(null), ...props }: SelectItemTextProps = $props()
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = $derived(mergeProps(select().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
