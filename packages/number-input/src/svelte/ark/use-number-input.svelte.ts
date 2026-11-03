import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/environment/use-environment-context.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as numberInput from '../../common/zag/number-input/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, ensureProps, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";

export interface UseNumberInputProps extends Optional<Omit<numberInput.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseNumberInputReturn extends Accessor<numberInput.Api<PropTypes>> {}

export const useNumberInput = (props: MaybeFunction<UseNumberInputProps> = {}): UseNumberInputReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    ensureProps(resolvedProps, ['id'])
    return {
      ids: {
        label: field?.()?.ids.label,
        input: field?.()?.ids.control,
      },
      dir: locale().dir,
      locale: locale().locale,
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      invalid: field?.()?.invalid,
      required: field?.()?.required,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(numberInput.machine, () => machineProps)
  const api = $derived(numberInput.connect(service, normalizeProps))

  return () => api
}
