import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as popover from '../../common/zag/popover/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePopoverReturn extends Accessor<popover.Api<PropTypes>> {}

export const usePopover = (props?: MaybeFunction<UsePopoverProps>): UsePopoverReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(popover.machine, () => machineProps)
  const api = $derived(popover.connect(service, normalizeProps))

  return () => api
}
