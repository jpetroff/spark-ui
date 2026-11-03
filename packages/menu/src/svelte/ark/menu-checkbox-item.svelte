<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { OptionItemProps } from '../../common/zag/menu/index.ts'

  type PartialOptionItemProps = Omit<OptionItemProps, 'type'>

  export interface MenuCheckboxItemBaseProps extends PartialOptionItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuCheckboxItemProps extends Assign<HTMLProps<'div'>, MenuCheckboxItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";
  import { MenuItemProvider } from "./use-menu-item-context.ts";
  import { MenuItemPropsProvider } from "./use-menu-option-item-props-context.ts";

  let { ref = $bindable(null), checked = $bindable<boolean>(), ...props }: MenuCheckboxItemProps = $props()

  const [partialOptionItemProps, localProps] = $derived(
    // @ts-expect-error - TODO: fix this
    createSplitProps<PartialOptionItemProps>()(props, [
      'checked',
      'closeOnSelect',
      'disabled',
      'onCheckedChange',
      'value',
      'valueText',
    ]),
  )

  const optionItemProps = $derived<OptionItemProps>({
    ...partialOptionItemProps,
    type: 'checkbox',
    checked,
    onCheckedChange(nextChecked) {
      if (checked !== undefined) checked = nextChecked
      partialOptionItemProps.onCheckedChange?.(nextChecked)
    },
  })

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getOptionItemProps(optionItemProps), localProps))
  const optionItemState = $derived(menu().getOptionItemState(optionItemProps))

  MenuItemPropsProvider(() => optionItemProps)
  MenuItemProvider(() => optionItemState)
</script>

<Ark as="div" bind:ref {...mergedProps} />
