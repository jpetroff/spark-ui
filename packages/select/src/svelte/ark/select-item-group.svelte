<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    id?: string
  }
  export interface SelectItemGroupProps extends Assign<HTMLProps<'div'>, SelectItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSelectContext } from "./use-select-context.ts";
  import { SelectItemGroupPropsProvider } from "./use-select-item-group-props-context.ts";

  let { ref = $bindable(null), ...props }: SelectItemGroupProps = $props()
  const providedId = $props.id()

  const groupProps = $derived({ id: props.id ?? providedId })
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getItemGroupProps(groupProps), props))

  SelectItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
