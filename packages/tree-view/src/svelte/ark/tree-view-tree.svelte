<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TreeViewTreeBaseProps extends PolymorphicProps<'ul'>, RefAttribute {}
  export interface TreeViewTreeProps extends Assign<HTMLProps<'ul'>, TreeViewTreeBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useTreeViewContext } from "./use-tree-view-context.ts";

  let { ref = $bindable(null), ...props }: TreeViewTreeProps = $props()

  const treeView = useTreeViewContext()
  const mergedProps = $derived(mergeProps(treeView().getTreeProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
