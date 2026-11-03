<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseNumberInputReturn } from "./use-number-input.svelte.ts";

  export interface NumberInputRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseNumberInputReturn
  }
  export interface NumberInputRootProviderProps extends Assign<HTMLProps<'div'>, NumberInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { NumberInputProvider } from "./use-number-input-context.ts";

  let { ref = $bindable(null), value, ...props }: NumberInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  NumberInputProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
