'use client'

import * as collapsible from '../../common/zag/collapsible/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId, useRef } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";
import { supportsActivity } from "@spark/shared/react/ark/utils/react-activity.ts";
import type { HideMode } from "@spark/shared/react/ark/utils/render-strategy.ts";
import type { RenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'>, RenderStrategyProps {}

export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  isUnmounted?: boolean | undefined
  /**
   * Resolved hide strategy for mounted content.
   */
  hideMode: HideMode
}

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const { lazyMount, unmountOnExit, hideMode = 'display-none', ...collapsibleProps } = props
  const id = useId()
  const wasVisible = useRef(false)
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const machineProps: collapsible.Props = {
    id,
    dir,
    getRootNode,
    ...collapsibleProps,
  }

  const service = useMachine(collapsible.machine, machineProps)
  const api = collapsible.connect(service, normalizeProps)

  if (api.visible) {
    wasVisible.current = true
  }

  const isUnmounted =
    (!api.visible && !wasVisible.current && lazyMount) || (unmountOnExit && !api.visible && wasVisible.current)

  const resolvedHideMode: HideMode = hideMode === 'activity' && supportsActivity ? 'activity' : 'display-none'

  return { ...api, isUnmounted, hideMode: resolvedHideMode }
}
