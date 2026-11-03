import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as collapsible from '../../common/zag/collapsible/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseCollapsibleProps extends Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * Whether the content should be lazy mounted
   */
  lazyMount?: boolean
  /**
   * Whether the content should be unmounted when collapsed
   */
  unmountOnExit?: boolean
  /**
   * Callback fired when the animation ends
   */
  onExitComplete?: () => void
}

export interface UseCollapsibleReturn extends Accessor<collapsible.Api<PropTypes> & { isUnmounted: boolean }> {}

export const useCollapsible = (props?: MaybeFunction<UseCollapsibleProps>): UseCollapsibleReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  let wasVisible = $state(false)

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const { lazyMount, unmountOnExit, onExitComplete, ...collapsibleProps } = resolvedProps || {}
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...collapsibleProps,
    }
  })

  const service = useMachine(collapsible.machine, () => machineProps)
  const api = $derived(collapsible.connect(service, normalizeProps))

  const resolvedProps = $derived(runIfFn(props))

  // Track if content was ever visible
  $effect(() => {
    if (api.visible) {
      wasVisible = true
    }
  })

  const isUnmounted = $derived.by(() => {
    const { lazyMount, unmountOnExit } = resolvedProps || {}
    return (!api.visible && !wasVisible && lazyMount) || (unmountOnExit && !api.visible && wasVisible)
  })

  return () => ({ ...api, isUnmounted: Boolean(isUnmounted) })
}
