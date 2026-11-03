<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TreeViewLabelBaseProps extends PolymorphicProps<'h3'>, RefAttribute {}
  export interface TreeViewLabelProps extends Assign<HTMLProps<'h3'>, TreeViewLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useTreeViewContext } from "./use-tree-view-context.ts";

  let { ref = $bindable(null), ...props }: TreeViewLabelProps = $props()

  const treeView = useTreeViewContext()
  const mergedProps = $derived(mergeProps(treeView().getLabelProps(), props))
</script>

<Ark as="h3" bind:ref {...mergedProps} />
