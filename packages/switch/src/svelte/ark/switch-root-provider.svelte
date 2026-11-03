<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseSwitchReturn } from "./use-switch.svelte.ts";

  export interface SwitchRootProviderBaseProps extends PolymorphicProps<'label'>, RefAttribute {
    value: UseSwitchReturn
  }
  export interface SwitchRootProviderProps extends Assign<HTMLProps<'label'>, SwitchRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { SwitchProvider } from "./use-switch-context.ts";

  let { ref = $bindable(null), value, ...props }: SwitchRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SwitchProvider(() => value())
</script>

<Ark as="label" bind:ref {...mergedProps} />
