import { createSplitProps } from "../../../../shared/src/svelte/ark/utils/create-split-props.ts";
import type { UseCheckboxGroupProps } from "./use-checkbox-group.svelte.ts";

const splitFn = createSplitProps<UseCheckboxGroupProps>()

export const splitCheckboxGroupProps = <T extends UseCheckboxGroupProps>(props: T) =>
  splitFn(props, [
    'defaultValue',
    'value',
    'onValueChange',
    'disabled',
    'invalid',
    'readOnly',
    'name',
    'maxSelectedValues',
  ])
