'use client'

import * as segmentGroup from '@spark/radio-group/common/zag/radio-group/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseSegmentGroupProps extends Optional<Omit<segmentGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSegmentGroupReturn extends segmentGroup.Api<PropTypes> {}

export const useSegmentGroup = (props?: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: segmentGroup.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(segmentGroup.machine, machineProps)
  return segmentGroup.connect(service, normalizeProps)
}
