<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseCollapsibleReturn } from "./use-collapsible.svelte.ts";

  interface RootProviderProps {
    value: UseCollapsibleReturn
  }

  export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CollapsibleRootProviderProps extends Assign<HTMLProps<'div'>, CollapsibleRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { CollapsibleProvider } from "./use-collapsible-context.ts";

  let { ref = $bindable(null), value, ...props }: CollapsibleRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  CollapsibleProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
