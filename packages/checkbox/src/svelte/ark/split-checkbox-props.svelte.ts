import { createSplitProps } from "../../../../shared/src/svelte/ark/utils/create-split-props.ts";
import type { UseCheckboxProps } from "./use-checkbox.svelte.ts";

const splitFn = createSplitProps<UseCheckboxProps>()

export const splitCheckboxProps = <T extends UseCheckboxProps>(props: T) =>
  splitFn(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])
