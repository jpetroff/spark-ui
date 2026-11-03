<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TreeViewBranchBaseProps extends PolymorphicProps<'li'>, RefAttribute {}
  export interface TreeViewBranchProps extends Assign<HTMLProps<'li'>, TreeViewBranchBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { Collapsible } from "@spark/collapsible/svelte/ark/index.ts";
  import { useTreeViewContext } from "./use-tree-view-context.ts";
  import { useTreeViewNodeContext } from "./use-tree-view-node-context.ts";
  import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

  let { ref = $bindable(null), ...props }: TreeViewBranchProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()

  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = $derived(mergeProps(treeView().getBranchProps(nodeProps()), props))
  const branchContentProps = $derived(treeView().getBranchContentProps(nodeProps()))
</script>

<Collapsible.Root
  bind:ref
  open={nodeState().expanded}
  ids={{ content: branchContentProps.id! }}
  {...renderStrategyProps()}
  {...mergedProps}
/>
