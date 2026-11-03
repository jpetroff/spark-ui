import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'
import type * as toast from '../../common/zag/toast/index.ts'
import type { Snippet } from 'svelte'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseToastContext extends Accessor<toast.Api<PropTypes, Snippet>> {}

export const [ToastProvider, useToastContext] = createContext<UseToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
