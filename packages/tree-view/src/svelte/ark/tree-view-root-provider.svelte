<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { Snippet } from 'svelte'
  import type { TreeNode } from "@spark/collection/svelte/ark/tree-collection.ts";
  import type { UseTreeViewReturn } from "./use-tree-view.svelte.ts";

  export interface TreeViewRootProviderBaseProps<T extends TreeNode>
    extends RenderStrategyProps, PolymorphicProps<'div'>, RefAttribute {
    value: UseTreeViewReturn<T>
  }
  export interface TreeViewRootProviderProps<T extends TreeNode> extends Assign<
    HTMLProps<'div'>,
    TreeViewRootProviderBaseProps<T>
  > {}

  export type TreeViewRootProviderComponent<P = {}> = <T extends TreeNode>(
    props: Assign<TreeViewRootProviderProps<T>, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends TreeNode">
  import { RenderStrategyPropsProvider } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { type RenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { TreeViewProvider } from "./use-tree-view-context.ts";

  let { ref = $bindable(null), value, ...props }: TreeViewRootProviderProps<T> = $props()

  const [renderStrategyProps, treeViewProps] = $derived(splitRenderStrategyProps(props))
  const mergedProps = $derived(mergeProps(value().getRootProps(), treeViewProps))

  TreeViewProvider(() => value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
