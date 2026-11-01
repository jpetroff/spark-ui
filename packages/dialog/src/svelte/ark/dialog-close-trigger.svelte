<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface DialogCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DialogCloseTriggerProps extends Assign<HTMLProps<'button'>, DialogCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogCloseTriggerProps = $props()

  const dialog = useDialogContext()
  const mergedProps = $derived(mergeProps(dialog().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
