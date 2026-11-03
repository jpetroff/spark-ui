import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
import type { UseNumberInputProps } from "./use-number-input.svelte.ts";

const splitFn = createSplitProps<UseNumberInputProps>()

export const splitNumberInputProps = <T extends UseNumberInputProps>(props: T) =>
  splitFn(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'disabled',
    'focusInputOnChange',
    'form',
    'formatOptions',
    'id',
    'ids',
    'inputMode',
    'invalid',
    'largeStep',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueCommit',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'required',
    'smallStep',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
