import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import * as tabs from '../../common/zag/tabs/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props?: MaybeFunction<UseTabsProps>): UseTabsReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      ...localProps,
      dir: locale().dir,
      getRootNode: env().getRootNode,
    }
  })

  const service = useMachine(tabs.machine, () => machineProps)
  const api = $derived(tabs.connect(service, normalizeProps))

  return () => api
}
