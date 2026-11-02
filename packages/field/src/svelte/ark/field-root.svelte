<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseFieldProps } from "./use-field.svelte.ts";

  export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface FieldRootProps extends Assign<HTMLProps<'div'>, FieldRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { FieldProvider } from "./use-field-context.ts";
  import { useField } from "./use-field.svelte.ts";

  let { ref = $bindable(null), ...props }: FieldRootProps = $props()

  const [useFieldProps, localProps] = $derived(
    createSplitProps<UseFieldProps>()(props, ['id', 'ids', 'disabled', 'invalid', 'readOnly', 'required', 'target']),
  )

  const providedId = $props.id()

  const machineProps = $derived.by(() => {
    return {
      ...useFieldProps,
      id: useFieldProps.id ?? providedId,
    }
  })

  const field = useField(() => machineProps)
  const mergedProps = $derived(mergeProps({ class: 'spark-field-root' }, field().getRootProps(), localProps))

  FieldProvider(field)

  function setNode(node: Element | null) {
    field().setRootRef(node)
  }
</script>

<Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
