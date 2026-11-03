<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseRadioGroupReturn } from "./use-radio-group.svelte.ts";

  interface RootProviderProps {
    value: UseRadioGroupReturn
  }

  export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupRootProviderProps extends Assign<HTMLProps<'div'>, RadioGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { RadioGroupProvider } from "./use-radio-group-context.ts";

  let { ref = $bindable(null), value, ...props }: RadioGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  RadioGroupProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
