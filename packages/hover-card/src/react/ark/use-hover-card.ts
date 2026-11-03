'use client'

import * as hoverCard from '../../common/zag/hover-card/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseHoverCardProps extends Optional<Omit<hoverCard.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseHoverCardReturn extends hoverCard.Api<PropTypes> {}

export const useHoverCard = (props?: UseHoverCardProps): UseHoverCardReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: hoverCard.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(hoverCard.machine, machineProps)
  return hoverCard.connect(service, normalizeProps)
}
