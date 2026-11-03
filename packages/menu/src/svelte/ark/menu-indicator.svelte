<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuIndicatorProps extends Assign<HTMLProps<'div'>, MenuIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";

  let { ref = $bindable(null), ...props }: MenuIndicatorProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
