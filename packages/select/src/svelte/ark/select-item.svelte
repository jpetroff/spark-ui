<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";

  export interface SelectItemBaseProps<T extends CollectionItem = CollectionItem>
    extends PolymorphicProps<'div'>, RefAttribute {
    item: T
    disabled?: boolean
  }
  export interface SelectItemProps<T extends CollectionItem = CollectionItem> extends Assign<
    HTMLProps<'div'>,
    SelectItemBaseProps<T>
  > {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import type { ItemProps } from '../../common/zag/select/index.ts'
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { useSelectContext } from "./use-select-context.ts";
  import { SelectItemProvider } from "./use-select-item-context.ts";
  import { SelectItemPropsProvider } from "./use-select-item-props-context.ts";

  let { ref = $bindable(null), ...props }: SelectItemProps<T> = $props()

  const select = useSelectContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['item', 'persistFocus']))
  const mergedProps = $derived(mergeProps(select().getItemProps(itemProps), localProps))

  SelectItemProvider(() => select().getItemState(itemProps))
  SelectItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
