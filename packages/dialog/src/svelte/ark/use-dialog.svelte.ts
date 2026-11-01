import { useEnvironmentContext } from "../../../../shared/src/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "../../../../shared/src/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "../../../../shared/src/svelte/ark/types.ts";
import type { Optional } from "../../../../shared/src/svelte/ark/types.ts";
import * as dialog from '../../common/zag/dialog/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '../../../../shared/src/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '../../../../shared/src/common/zag/utils/index.ts'

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'getRootNode' | 'dir'>, 'id'> {}

export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props?: MaybeFunction<UseDialogProps>): UseDialogReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      getRootNode: env().getRootNode,
      dir: locale().dir,
      ...resolvedProps,
    }
  })

  const service = useMachine(dialog.machine, () => machineProps)
  const api = $derived(dialog.connect(service, normalizeProps))

  return () => api
}
