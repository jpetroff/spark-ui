import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";
import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Optional } from "@spark/shared/svelte/ark/types.ts";
import * as select from '../../common/zag/select/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'
import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";
import type { ListCollection } from "@spark/collection/svelte/ark/list-collection.ts";
import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";

export interface UseSelectProps<T extends CollectionItem> extends Optional<
  Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends Accessor<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(props: MaybeFunction<UseSelectProps<T>>): UseSelectReturn<T> => {
  const locale = useLocaleContext()
  const env = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = $derived.by<UseSelectProps<T>>(() => {
    const resolvedProps = runIfFn(props)
    return {
      ids: {
        label: field?.()?.ids?.label,
        hiddenSelect: field?.()?.ids?.control,
      },
      disabled: field?.()?.disabled,
      readOnly: field?.()?.readOnly,
      invalid: field?.()?.invalid,
      required: field?.()?.required,
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(select.machine, () => machineProps)

  const api = $derived(select.connect(service, normalizeProps))
  return () => api
}
