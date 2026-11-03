<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ValueChangeDetails } from '../../common/zag/radio-group/index.ts'
  import type { UseRadioGroupProps } from "./use-radio-group.svelte.ts";

  export interface RadioGroupRootEmits {
    valueChange: ValueChangeDetails
  }

  export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupRootProps extends Assign<HTMLProps<'div'>, RadioGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { RadioGroupProvider } from "./use-radio-group-context.ts";
  import { useRadioGroup } from "./use-radio-group.svelte.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: RadioGroupRootProps = $props()
  const providedId = $props.id()

  const [radioGroupProps, localProps] = $derived(
    createSplitProps<UseRadioGroupProps>()(props, [
      'defaultValue',
      'disabled',
      'form',
      'id',
      'ids',
      'invalid',
      'name',
      'onValueChange',
      'orientation',
      'readOnly',
      'required',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseRadioGroupProps>({
    ...radioGroupProps,
    id: radioGroupProps.id ?? providedId,
    value,
    onValueChange(details) {
      radioGroupProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const radioGroup = useRadioGroup(() => resolvedProps)
  const mergedProps = $derived(mergeProps(radioGroup().getRootProps(), localProps))

  RadioGroupProvider(radioGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
