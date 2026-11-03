<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { OptionItemProps } from '../../common/zag/menu/index.ts'

  type PartialOptionItemProps = Omit<OptionItemProps, 'type' | 'checked' | 'onCheckedChange'>

  export interface MenuRadioItemBaseProps extends PartialOptionItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuRadioItemProps extends Assign<HTMLProps<'div'>, MenuRadioItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { useMenuContext } from "./use-menu-context.ts";
  import { MenuItemProvider } from "./use-menu-item-context.ts";
  import { useMenuItemGroupContext } from "./use-menu-item-group-context.ts";
  import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";

  let { ref = $bindable(null), ...props }: MenuRadioItemProps = $props()

  const [partialItemProps, localProps] = $derived(
    createSplitProps<PartialOptionItemProps>()(props, ['closeOnSelect', 'disabled', 'value', 'valueText']),
  )

  const menu = useMenuContext()
  const itemGroup = useMenuItemGroupContext()

  const optionItemProps: OptionItemProps = $derived({
    ...partialItemProps,
    checked: itemGroup().value === partialItemProps.value,
    type: 'radio',
    onCheckedChange: () => itemGroup().onValueChange?.({ value: partialItemProps.value }),
  })

  const mergedProps = $derived(mergeProps(menu().getOptionItemProps(optionItemProps), localProps))
  const optionItemState = $derived(menu().getOptionItemState(optionItemProps))

  MenuItemPropsProvider(() => optionItemProps)
  MenuItemProvider(() => optionItemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
