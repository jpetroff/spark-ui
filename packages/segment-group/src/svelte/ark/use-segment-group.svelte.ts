import * as segmentGroup from '@spark/radio-group/common/zag/radio-group/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";

export interface UseSegmentGroupProps extends Optional<Omit<segmentGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSegmentGroupReturn extends Accessor<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (props: MaybeFunction<UseSegmentGroupProps>): UseSegmentGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(segmentGroup.machine, () => resolvedProps)
  const api = $derived(segmentGroup.connect(service, normalizeProps))
  return () => api
}
