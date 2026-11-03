<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TreeViewBranchIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TreeViewBranchIndicatorProps extends Assign<HTMLProps<'div'>, TreeViewBranchIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useTreeViewContext } from "./use-tree-view-context.ts";
  import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

  let { ref = $bindable(null), ...props }: TreeViewBranchIndicatorProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getBranchIndicatorProps(nodeProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
