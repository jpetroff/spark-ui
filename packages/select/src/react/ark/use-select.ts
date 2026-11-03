'use client'

import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import * as select from '../../common/zag/select/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import type { CollectionItem } from "@spark/collection/react/ark/list-collection.ts";
import type { ListCollection } from "@spark/collection/react/ark/list-collection.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";

export interface UseSelectProps<T extends CollectionItem> extends Optional<
  Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>,
  'id'
> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
}

export interface UseSelectReturn<T extends CollectionItem> extends select.Api<PropTypes, T> {}

export const useSelect = <T extends CollectionItem>(props: UseSelectProps<T>): UseSelectReturn<T> => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps: select.Props<T> = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenSelect: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(select.machine, machineProps)
  return select.connect(service, normalizeProps)
}
