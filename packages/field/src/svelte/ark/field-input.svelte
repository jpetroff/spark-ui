<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FieldInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface FieldInputProps extends Assign<HTMLProps<'input'>, FieldInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
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

  const mergedProps = $derived(mergeProps({ class: 'spark-field-input' }, field?.()?.getInputProps() ?? {}, nativeInputProps, props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
