<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DialogDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DialogDescriptionProps extends Assign<HTMLProps<'div'>, DialogDescriptionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogDescriptionProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-dialog-description' }, dialog().getDescriptionProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
