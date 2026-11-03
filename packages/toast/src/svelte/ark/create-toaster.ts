import * as toast from '../../common/zag/toast/index.ts'

export interface CreateToasterProps extends toast.StoreProps {}

export type CreateToasterReturn<T = any> = toast.Store<T>

export const createToaster = <T = any>(props: CreateToasterProps): CreateToasterReturn<T> => {
  return toast.createStore(props)
}
