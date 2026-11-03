import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
import type { UseCollapsibleProps } from "./use-collapsible.svelte.ts";

const splitFn = createSplitProps<UseCollapsibleProps>()

export const splitCollapsibleProps = <T extends UseCollapsibleProps>(props: T) =>
  splitFn(props, [
    'collapsedHeight',
    'collapsedWidth',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])
