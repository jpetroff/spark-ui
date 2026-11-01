<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface DialogTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface DialogTitleProps extends Assign<HTMLProps<'h2'>, DialogTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogTitleProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps(dialog().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
