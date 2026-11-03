'use client'

import * as radio from '../../common/zag/radio-group/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { useFieldsetContext } from "@spark/fieldset/react/ark/use-fieldset-context.ts";

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (props?: UseRadioGroupProps): UseRadioGroupReturn => {
  const fieldset = useFieldsetContext()
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: radio.Props = {
    id,
    ids: {
      label: fieldset?.ids?.legend,
    },
    dir,
    disabled: fieldset?.disabled,
    invalid: fieldset?.invalid,
    getRootNode,
    ...props,
  }

  const service = useMachine(radio.machine, machineProps)
  return radio.connect(service, normalizeProps)
}
