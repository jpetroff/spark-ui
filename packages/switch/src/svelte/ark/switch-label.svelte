<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SwitchLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SwitchLabelProps extends Assign<HTMLProps<'span'>, SwitchLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSwitchContext } from "./use-switch-context.ts";

  let { ref = $bindable(null), ...props }: SwitchLabelProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
