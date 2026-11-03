'use client'

import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import * as toggle from '../../common/zag/toggle/index.ts'

export interface UseToggleProps extends toggle.Props {}

export interface UseToggleReturn extends toggle.Api<PropTypes> {}

export function useToggle(props?: UseToggleProps): UseToggleReturn {
  const service = useMachine(toggle.machine, props)
  return toggle.connect(service, normalizeProps)
}
