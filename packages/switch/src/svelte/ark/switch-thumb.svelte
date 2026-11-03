<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SwitchThumbBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SwitchThumbProps extends Assign<HTMLProps<'span'>, SwitchThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSwitchContext } from "./use-switch-context.ts";

  let { ref = $bindable(null), ...props }: SwitchThumbProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getThumbProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
