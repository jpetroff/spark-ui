<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  interface ItemBaseProps extends ItemProps {
    /**
     * The function to call when the item is selected
     */
    onSelect?: VoidFunction
  }

  export interface MenuItemBaseProps extends ItemBaseProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuItemProps extends Assign<HTMLProps<'div'>, MenuItemBaseProps> {}
</script>

<script lang="ts">
  import type { ItemProps } from '../../common/zag/menu/index.ts'
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { MenuItemProvider } from "./use-menu-item-context.ts";
  import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";

  let { ref = $bindable(null), ...props }: MenuItemProps = $props()

  const [itemProps, localProps] = $derived(
    createSplitProps<ItemBaseProps>()(props, ['closeOnSelect', 'disabled', 'value', 'valueText', 'onSelect']),
  )

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getItemProps(itemProps), localProps))
  const itemState = $derived(menu().getItemState(itemProps))

  $effect(() => {
    return menu().addItemListener({
      id: itemState.id,
      onSelect: itemProps.onSelect,
    })
  })

  MenuItemPropsProvider(() => itemProps)
  MenuItemProvider(() => itemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
