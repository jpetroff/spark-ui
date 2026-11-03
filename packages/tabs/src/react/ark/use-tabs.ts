'use client'

import { type PropTypes, normalizeProps, useMachine } from '@spark/shared/react/zag/index.ts'
import * as tabs from '../../common/zag/tabs/index.ts'
import { useId } from 'react'
import { useEnvironmentContext } from "@spark/shared/react/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/react/ark/providers/index.ts";
import type { Optional } from "@spark/shared/react/ark/types.ts";

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTabsReturn extends tabs.Api<PropTypes> {}

export const useTabs = (props?: UseTabsProps): UseTabsReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: tabs.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(tabs.machine, machineProps)
  return tabs.connect(service, normalizeProps)
}
