<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface FieldSelectBaseProps extends PolymorphicProps<'select'>, RefAttribute {}
  export interface FieldSelectProps extends Assign<HTMLProps<'select'>, FieldSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), value = $bindable(), multiple, ...props }: FieldSelectProps = $props()

  const field = useFieldContext()

  const nativeSelectProps: HTMLProps<'select'> = $derived({
    value,
    multiple,
    oninput(e) {
      value = multiple
        ? Array.from(e.currentTarget.selectedOptions).map((option) => option.value)
        : e.currentTarget.value
    },
  })

  const mergedProps = $derived(mergeProps(field?.()?.getSelectProps() ?? {}, nativeSelectProps, props))
</script>

<Ark as="select" bind:ref {...mergedProps} />
