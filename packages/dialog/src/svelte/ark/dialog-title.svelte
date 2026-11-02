<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DialogTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface DialogTitleProps extends Assign<HTMLProps<'h2'>, DialogTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogTitleProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-dialog-title' }, dialog().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
