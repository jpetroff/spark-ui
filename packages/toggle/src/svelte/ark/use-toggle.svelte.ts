import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import * as toggle from '../../common/zag/toggle/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseToggleProps extends Omit<toggle.Props, 'dir' | 'getRootNode'> {}

export interface UseToggleReturn extends Accessor<toggle.Api<PropTypes>> {}

export const useToggle = (props: MaybeFunction<UseToggleProps> = {}): UseToggleReturn => {
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

  const service = useMachine(toggle.machine, () => machineProps)
  const api = $derived(toggle.connect(service, normalizeProps))

  return () => api
}
