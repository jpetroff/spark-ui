import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as menu from '../../common/zag/menu/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenuReturn extends Accessor<{
  api: menu.Api<PropTypes>
  service: menu.Service
}> {}

export const useMenu = (props?: MaybeFunction<UseMenuProps>): UseMenuReturn => {
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

  const service = useMachine(menu.machine, () => machineProps)
  const api = $derived(menu.connect(service, normalizeProps))

  return () => ({ api, service })
}
