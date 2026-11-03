'use client'

import * as scrollArea from '../../common/zag/scroll-area/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseScrollAreaReturn extends scrollArea.Api<PropTypes> {}

export const useScrollArea = (props?: UseScrollAreaProps): UseScrollAreaReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: scrollArea.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(scrollArea.machine, context)
  return scrollArea.connect(service, normalizeProps)
}
