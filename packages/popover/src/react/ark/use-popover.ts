'use client'

import * as popover from '../../common/zag/popover/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePopoverReturn extends popover.Api<PropTypes> {}

export const usePopover = (props?: UsePopoverProps): UsePopoverReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: popover.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(popover.machine, machineProps)
  return popover.connect(service, normalizeProps)
}
