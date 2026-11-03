'use client'

import * as floatingPanel from '../../common/zag/floating-panel/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseFloatingPanelProps extends Optional<Omit<floatingPanel.Props, 'getRootNode'>, 'id'> {}

export interface UseFloatingPanelReturn extends floatingPanel.Api<PropTypes> {}

export const useFloatingPanel = (props: UseFloatingPanelProps = {}): UseFloatingPanelReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: floatingPanel.Props = {
    id: useId(),
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(floatingPanel.machine, context)

  return floatingPanel.connect(service, normalizeProps)
}
