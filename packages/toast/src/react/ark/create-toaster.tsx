'use client'

import * as toast from '../../common/zag/toast/index.ts'
import type { ReactNode } from 'react'

export interface CreateToasterProps extends toast.StoreProps {}

export type CreateToasterReturn<T = ReactNode> = toast.Store<T>

export const createToaster = <T = ReactNode,>(props: CreateToasterProps): CreateToasterReturn<T> => {
  return toast.createStore(props)
}
