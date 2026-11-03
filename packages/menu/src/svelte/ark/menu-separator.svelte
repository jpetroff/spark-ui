<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface MenuSeparatorBaseProps extends PolymorphicProps<'hr'>, RefAttribute {}
  export interface MenuSeparatorProps extends Assign<HTMLProps<'hr'>, MenuSeparatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useMenuContext } from "./use-menu-context.ts";

  let { ref = $bindable(null), ...props }: MenuSeparatorProps = $props()

  const menu = useMenuContext()
  const mergedProps = $derived(mergeProps(menu().getSeparatorProps(), props))
</script>

<Ark as="hr" bind:ref data-scope="menu" data-part="separator" {...mergedProps} />
