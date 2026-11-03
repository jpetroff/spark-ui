<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseSwitchProps } from "./use-switch.svelte.ts";

  export interface SwitchRootBaseProps extends UseSwitchProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface SwitchRootProps extends Assign<HTMLProps<'label'>, SwitchRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSwitch } from "./use-switch.svelte.ts";
  import { SwitchProvider } from "./use-switch-context.ts";

  let { ref = $bindable(null), checked = $bindable(), ...props }: SwitchRootProps = $props()
  const providedId = $props.id()

  const [useSwitchProps, localProps] = $derived(
    createSplitProps<UseSwitchProps>()(props, [
      'checked',
      'defaultChecked',
      'disabled',
      'form',
      'id',
      'ids',
      'invalid',
      'label',
      'name',
      'onCheckedChange',
      'readOnly',
      'required',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseSwitchProps>({
    ...useSwitchProps,
    id: useSwitchProps.id ?? providedId,
    checked,
    onCheckedChange(details) {
      useSwitchProps.onCheckedChange?.(details)
      if (checked !== undefined) checked = details.checked
    },
  })

  const switchMachine = useSwitch(() => resolvedProps)
  const mergedProps = $derived(mergeProps(switchMachine().getRootProps(), localProps))

  SwitchProvider(switchMachine)
</script>

<Ark as="label" bind:ref {...mergedProps} />
