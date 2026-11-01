import { useEnvironmentContext } from "../../../../shared/src/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "../../../../shared/src/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "../../../../shared/src/svelte/ark/types.ts";
import type { Optional } from "../../../../shared/src/svelte/ark/types.ts";
import * as checkbox from '../../common/zag/checkbox/index.ts'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '../../../../shared/src/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '../../../../shared/src/common/zag/utils/index.ts'
import { useFieldContext } from "../../../../field/src/svelte/ark/use-field-context.ts";
import { useCheckboxGroupContext } from "./use-checkbox-group-context.ts";

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: MaybeFunction<UseCheckboxProps> = {}): UseCheckboxReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const checkboxGroup = useCheckboxGroupContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    const localProps = mergeProps(checkboxGroup?.()?.getItemProps({ value: resolvedProps.value }) ?? {}, resolvedProps)
    return {
      ids: {
        label: field?.()?.ids.label,
        hiddenInput: field?.()?.ids.control,
      },
      dir: locale().dir,
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      invalid: field?.()?.invalid,
      required: field?.()?.required,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(checkbox.machine, () => machineProps)
  const api = $derived(checkbox.connect(service, normalizeProps))

  return () => api
}
