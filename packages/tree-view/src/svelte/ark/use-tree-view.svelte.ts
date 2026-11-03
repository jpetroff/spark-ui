import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import * as treeView from '../../common/zag/tree-view/index.ts'
import { type MaybeFunction, ensureProps, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import type { TreeNode } from "@spark/collection/svelte/ark/tree-collection.ts";

export interface UseTreeViewProps<T extends TreeNode> extends Optional<
  Omit<treeView.Props<T>, 'dir' | 'getRootNode'>,
  'id'
> {}

export interface UseTreeViewReturn<T extends TreeNode> extends Accessor<treeView.Api<PropTypes, T>> {}

export const useTreeView = <T extends TreeNode>(props: MaybeFunction<UseTreeViewProps<T>>): UseTreeViewReturn<T> => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    ensureProps(resolvedProps, ['id'])
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(treeView.machine, () => machineProps)

  const api = $derived(treeView.connect(service, normalizeProps))

  return () => api
}
