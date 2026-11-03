<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseMenuItemGroupContext } from "./use-menu-item-group-context.ts";

  type OptionalUseMenuItemGroupContext = Optional<ReturnType<UseMenuItemGroupContext>, 'id'>

  export interface MenuRadioItemGroupBaseProps
    extends OptionalUseMenuItemGroupContext, PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuRadioItemGroupProps extends Assign<HTMLProps<'div'>, MenuRadioItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { useMenuContext } from "./use-menu-context.ts";
  import { MenuItemGroupProvider } from "./use-menu-item-group-context.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: MenuRadioItemGroupProps = $props()
  const id = $props.id()

  const [optionalItemGroupProps, localProps] = $derived(
    createSplitProps<OptionalUseMenuItemGroupContext>()(props, ['id', 'onValueChange', 'value']),
  )

  const menu = useMenuContext()

  const itemGroupProps = $derived<ReturnType<UseMenuItemGroupContext>>({
    id: optionalItemGroupProps.id ?? id,
    value,
    onValueChange(e) {
      value = e.value
      optionalItemGroupProps?.onValueChange?.(e)
    },
  })

  const mergedProps = $derived(mergeProps(menu().getItemGroupProps({ id: itemGroupProps.id }), localProps))

  MenuItemGroupProvider(() => itemGroupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
