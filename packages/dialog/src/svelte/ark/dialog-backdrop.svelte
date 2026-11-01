<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface DialogBackdropBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    ref?: Element | null
  }
  export interface DialogBackdropProps extends Assign<HTMLProps<'div'>, DialogBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from "../../../../shared/src/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { usePresence } from "../../../../presence/src/svelte/ark/use-presence.svelte.ts";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogBackdropProps = $props()

  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({ ...renderStrategyProps(), present: dialog().open }))
  const mergedProps = $derived(mergeProps(dialog().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
