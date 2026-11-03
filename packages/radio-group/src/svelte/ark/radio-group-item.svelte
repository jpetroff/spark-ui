<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ItemProps } from '../../common/zag/radio-group/index.ts'

  export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface RadioGroupItemProps extends Assign<HTMLProps<'label'>, RadioGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { useRadioGroupContext } from "./use-radio-group-context.ts";
  import { RadioGroupItemProvider } from "./use-radio-group-item-context.ts";
  import { RadioGroupItemPropsProvider } from "./use-radio-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: RadioGroupItemProps = $props()
  const radioGroup = useRadioGroupContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled', 'invalid']))

  const itemState = $derived(radioGroup().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(radioGroup().getItemProps(itemProps), localProps))

  RadioGroupItemProvider(() => itemState)
  RadioGroupItemPropsProvider(() => itemProps)
</script>

<Ark as="label" bind:ref {...mergedProps} />
