import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
import type { UseSegmentGroupProps } from "./use-segment-group.svelte.ts";

const splitFn = createSplitProps<UseSegmentGroupProps>()

export const splitSegmentGroupProps = <T extends UseSegmentGroupProps>(props: T) =>
  splitFn(props, [
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onValueChange',
    'orientation',
    'readOnly',
    'required',
    'value',
  ])
