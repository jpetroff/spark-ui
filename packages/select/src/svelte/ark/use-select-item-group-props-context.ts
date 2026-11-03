import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseSelectItemGroupPropsContext extends Accessor<{ id: string }> {}

export const [SelectItemGroupPropsProvider, useSelectItemGroupPropsContext] =
  createContext<UseSelectItemGroupPropsContext>({
    name: 'SelectItemGroupPropsContext',
  })
