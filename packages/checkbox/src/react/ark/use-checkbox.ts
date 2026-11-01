'use client'

import * as checkbox from '../../common/zag/checkbox/index.ts'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId, useMemo } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useCheckboxGroupContext } from "./use-checkbox-group-context.tsx";

export interface UseCheckboxProps extends Optional<Omit<checkbox.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCheckboxReturn extends checkbox.Api<PropTypes> {}

export const useCheckbox = (ownProps: UseCheckboxProps = {}): UseCheckboxReturn => {
  const checkboxGroup = useCheckboxGroupContext()
  const field = useFieldContext()

  const props = useMemo(() => {
    return mergeProps(checkboxGroup?.getItemProps({ value: ownProps.value }) ?? {}, ownProps)
  }, [ownProps, checkboxGroup])

  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: checkbox.Props = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    getRootNode,
    ...props,
  }

  const service = useMachine(checkbox.machine, machineProps)
  return checkbox.connect(service, normalizeProps)
}
