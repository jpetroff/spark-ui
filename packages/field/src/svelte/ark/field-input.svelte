<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface FieldInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface FieldInputProps extends Assign<HTMLProps<'input'>, FieldInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";
  import type { HTMLInputAttributes } from 'svelte/elements'

  let { ref = $bindable(null), value = $bindable(), ...props }: FieldInputProps = $props()
  const field = useFieldContext()

  const nativeInputProps: HTMLInputAttributes = $derived({
    value,
    oninput(e) {
      value = e.currentTarget.value
    },
  })

  const mergedProps = $derived(mergeProps(field?.()?.getInputProps() ?? {}, nativeInputProps, props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
