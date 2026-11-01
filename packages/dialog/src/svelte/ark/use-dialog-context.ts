import { createContext } from "../../../../shared/src/svelte/ark/utils/create-context.ts";
import type { UseDialogReturn } from "./use-dialog.svelte.ts";

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>({
  name: 'DialogContext',
})
