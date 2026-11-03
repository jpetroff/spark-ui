import * as radio from '../../common/zag/radio-group/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import { useFieldsetContext } from "@spark/fieldset/svelte/ark/use-fieldset-context.ts";

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends Accessor<radio.Api<PropTypes>> {}

export const useRadioGroup = (props: MaybeFunction<UseRadioGroupProps>): UseRadioGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const fieldset = useFieldsetContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    const fieldsetContext = fieldset?.()

    return {
      ids: {
        label: fieldsetContext?.ids?.legend,
      },
      dir: locale().dir,
      disabled: fieldsetContext?.disabled,
      invalid: fieldsetContext?.invalid,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(radio.machine, () => resolvedProps)
  const api = $derived(radio.connect(service, normalizeProps))
  return () => api
}
