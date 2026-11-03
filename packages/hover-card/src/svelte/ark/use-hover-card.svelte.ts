import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as hoverCard from '../../common/zag/hover-card/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseHoverCardProps extends Optional<Omit<hoverCard.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseHoverCardReturn extends Accessor<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (props?: MaybeFunction<UseHoverCardProps>): UseHoverCardReturn => {
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

  const service = useMachine(hoverCard.machine, () => machineProps)
  const api = $derived(hoverCard.connect(service, normalizeProps))

  return () => api
}
