'use client'

import * as numberInput from '../../common/zag/number-input/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";

export interface UseNumberInputProps extends Optional<Omit<numberInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNumberInputReturn extends numberInput.Api<PropTypes> {}

export const useNumberInput = (props?: UseNumberInputProps): UseNumberInputReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir, locale } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: numberInput.Props = {
    id,
    ids: {
      label: field?.ids.label,
      input: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    invalid: field?.invalid,
    dir,
    locale,
    getRootNode,
    ...props,
  }

  const service = useMachine(numberInput.machine, machineProps)
  return numberInput.connect(service, normalizeProps)
}
