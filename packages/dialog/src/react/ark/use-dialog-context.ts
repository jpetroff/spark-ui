'use client'

import { createContext } from "../../../../shared/src/react/ark/utils/create-context.ts";
import type { UseDialogReturn } from "./use-dialog.ts";

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>({
  name: 'DialogContext',
  hookName: 'useDialogContext',
  providerName: '<DialogProvider />',
})
