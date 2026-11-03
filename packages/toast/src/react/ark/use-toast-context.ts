'use client'

import type { PropTypes } from '@spark/shared/react/zag/index.ts'
import type * as toast from '../../common/zag/toast/index.ts'
import type { ReactNode } from 'react'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseToastContext extends toast.Api<PropTypes, ReactNode> {}

export const [ToastProvider, useToastContext] = createContext<UseToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
