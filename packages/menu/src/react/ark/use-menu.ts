'use client'

import * as menu from '../../common/zag/menu/index.ts'
import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenuReturn {
  api: menu.Api<PropTypes>
  service: menu.Service
}

export const useMenu = (props?: UseMenuProps): UseMenuReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: menu.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(menu.machine, machineProps)
  const api = menu.connect(service, normalizeProps)

  return { api, service }
}
