<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
  import type { UseFieldReturn } from "./use-field.svelte.ts";

  export interface FieldRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseFieldReturn
  }
  export interface FieldRootProviderProps extends Assign<HTMLProps<'div'>, FieldRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { FieldProvider } from "./use-field-context.ts";

  const { value, ...props }: FieldRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FieldProvider(() => value())
</script>

<Ark as="div" {...mergedProps} />
