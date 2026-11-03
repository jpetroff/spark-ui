'use client'

import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import * as zagSwitch from '../../common/zag/switch/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSwitchReturn extends zagSwitch.Api<PropTypes> {}

export const useSwitch = (props?: UseSwitchProps): UseSwitchReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: zagSwitch.Props = {
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

  const service = useMachine(zagSwitch.machine, machineProps)
  return zagSwitch.connect(service, normalizeProps)
}
