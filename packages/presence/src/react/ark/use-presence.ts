'use client'

import * as presence from '../../common/zag/presence/index.ts'
import { normalizeProps, useMachine } from '../../../../shared/src/react/zag/index.ts'
import { useRef } from 'react'
import type { Optional } from "../../../../shared/src/react/ark/types.ts";
import { supportsActivity } from "../../../../shared/src/react/ark/utils/react-activity.ts";
import type { HideMode } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import type { RenderStrategyProps } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import { useEvent } from "../../../../shared/src/react/ark/utils/use-event.ts";

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean | undefined
}
export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps = {}) => {
  const { lazyMount, unmountOnExit, hideMode = 'display-none', present, skipAnimationOnMount = false, ...rest } = props
  const wasEverPresent = useRef(false)
  const machineProps: Partial<presence.Props> = {
    ...rest,
    present,
    onEnterComplete: useEvent(props.onEnterComplete),
    onExitComplete: useEvent(props.onExitComplete),
  }

  const service = useMachine(presence.machine, machineProps)
  const api = presence.connect(service, normalizeProps)

  if (api.present) {
    wasEverPresent.current = true
  }

  const unmounted =
    (!api.present && !wasEverPresent.current && lazyMount) || (unmountOnExit && !api.present && wasEverPresent.current)

  const resolvedHideMode: HideMode = hideMode === 'activity' && supportsActivity ? 'activity' : 'display-none'

  const getPresenceProps = () => ({
    'data-state': api.skip && skipAnimationOnMount ? undefined : present ? 'open' : 'closed',
    hidden: resolvedHideMode === 'activity' ? false : !api.present,
  })

  return {
    ref: api.setNode,
    getPresenceProps,
    present: api.present,
    unmounted,
    hideMode: resolvedHideMode,
  }
}
