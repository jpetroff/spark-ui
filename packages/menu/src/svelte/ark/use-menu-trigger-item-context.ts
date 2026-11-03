import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type * as menu from '../../common/zag/menu/index.ts'
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'

export type UseMenuTriggerItemContext = () => ReturnType<menu.Api<PropTypes>['getTriggerItemProps']> | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<UseMenuTriggerItemContext>({
  name: 'MenuTriggerItemContext',
  hookName: 'useMenuTriggerItemContext',
  providerName: '<MenuTriggerItemProvider />',
  strict: false,
})
