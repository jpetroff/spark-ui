import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as floatingPanel from '../../common/zag/floating-panel/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";

export interface UseFloatingPanelProps extends Optional<Omit<floatingPanel.Props, 'getRootNode'>, 'id'> {}
export interface UseFloatingPanelReturn extends Accessor<floatingPanel.Api<PropTypes>> {}

export const useFloatingPanel = (props: MaybeFunction<UseFloatingPanelProps> = {}): UseFloatingPanelReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(floatingPanel.machine, () => resolvedProps)
  const api = $derived(floatingPanel.connect(service, normalizeProps))
  return () => api
}
