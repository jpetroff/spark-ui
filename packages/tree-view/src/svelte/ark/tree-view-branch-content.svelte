<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TreeViewBranchContentBaseProps extends PolymorphicProps<'ul'>, RefAttribute {
    ref?: Element | null
  }
  export interface TreeViewBranchContentProps extends Assign<HTMLProps<'ul'>, TreeViewBranchContentBaseProps> {}

  interface VisibilityProps {
    hidden?: boolean
    'data-state'?: string
  }
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { Collapsible } from "@spark/collapsible/svelte/ark/index.ts";
  import { useTreeViewContext } from "./use-tree-view-context.ts";
  import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

  let { ref = $bindable(null), ...props }: TreeViewBranchContentProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const contentProps = $derived(treeView().getBranchContentProps(nodeProps()))

  const splitVisibilityProps = $derived(createSplitProps<VisibilityProps>())
  const [, branchContentProps] = $derived(splitVisibilityProps(contentProps as any, ['hidden', 'data-state']))

  const mergedProps = $derived(mergeProps(branchContentProps, props))
</script>

<Collapsible.Content bind:ref {...mergedProps} />
