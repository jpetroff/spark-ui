import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import * as zagSwitch from '../../common/zag/switch/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSwitchReturn extends Accessor<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props?: MaybeFunction<UseSwitchProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ids: {
        label: field?.()?.ids.label,
        hiddenInput: field?.()?.ids.control,
      },
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      invalid: field?.()?.invalid,
      required: field?.()?.required,
      ...resolvedProps,
    }
  })

  const service = useMachine(zagSwitch.machine, () => machineProps)
  const api = $derived(zagSwitch.connect(service, normalizeProps))

  return () => api
}
