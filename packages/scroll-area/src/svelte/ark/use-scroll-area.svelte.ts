import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as scrollArea from '../../common/zag/scroll-area/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseScrollAreaReturn extends Accessor<scrollArea.Api<PropTypes>> {}

export const useScrollArea = (props: MaybeFunction<UseScrollAreaProps> = {}): UseScrollAreaReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(scrollArea.machine, () => machineProps)
  const api = $derived(scrollArea.connect(service, normalizeProps))

  return () => api
}
