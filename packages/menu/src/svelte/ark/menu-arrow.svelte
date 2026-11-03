<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface MenuArrowProps extends Assign<HTMLProps<'div'>, MenuArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";

  let { ref = $bindable(null), ...props }: MenuArrowProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
