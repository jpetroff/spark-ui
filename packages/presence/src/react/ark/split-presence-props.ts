'use client'

import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import type { UsePresenceProps } from "./use-presence.ts";

export const splitPresenceProps = <T extends UsePresenceProps>(props: T) =>
  createSplitProps<UsePresenceProps>()(props, [
    'hideMode',
    'immediate',
    'lazyMount',
    'onEnterComplete',
    'onExitComplete',
    'present',
    'skipAnimationOnMount',
    'unmountOnExit',
  ])
