<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseToggleProps } from "./use-toggle.svelte.ts";

  export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface ToggleRootProps extends Assign<HTMLProps<'button'>, ToggleRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToggle } from "./use-toggle.svelte.ts";
  import { ToggleProvider } from "./use-toggle-context.ts";

  let { ref = $bindable(null), pressed = $bindable<boolean>(), ...props }: ToggleRootProps = $props()

  const [useToggleProps, localProps] = $derived(
    createSplitProps<UseToggleProps>()(props, ['pressed', 'defaultPressed', 'disabled', 'onPressedChange']),
  )

  const machineProps = $derived.by<UseToggleProps>(() => ({
    ...useToggleProps,
    pressed,
    onPressedChange(nextPressed) {
      useToggleProps.onPressedChange?.(nextPressed)
      pressed = nextPressed
    },
  }))

  const toggle = useToggle(() => machineProps)
  const mergedProps = $derived(mergeProps(toggle().getRootProps(), localProps))

  ToggleProvider(toggle)
</script>

<Ark as="button" bind:ref {...mergedProps} />
