import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type * as floatingPanel from '../../common/zag/floating-panel/index.ts'
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseFloatingPanelContext extends Accessor<floatingPanel.Api<PropTypes>> {}

export const [FloatingPanelProvider, useFloatingPanelContext] = createContext<UseFloatingPanelContext>({
  name: 'FloatingPanelContext',
  hookName: 'useFloatingPanelContext',
  providerName: '<FloatingPanelProvider />',
})
