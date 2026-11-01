'use client'

import * as dialog from '../../common/zag/dialog/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '../../../../shared/src/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "../../../../shared/src/react/ark/providers/index.ts";
import { useLocaleContext } from "../../../../shared/src/react/ark/providers/index.ts";
import type { Optional } from "../../../../shared/src/react/ark/types.ts";

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'getRootNode' | 'dir'>, 'id'> {}

export interface UseDialogReturn extends dialog.Api<PropTypes> {}

export const useDialog = (props?: UseDialogProps): UseDialogReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: dialog.Props = {
    id,
    getRootNode,
    dir,
    ...props,
  }

  const service = useMachine(dialog.machine, machineProps)
  return dialog.connect(service, normalizeProps)
}
