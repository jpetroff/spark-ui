<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DialogBackdropBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    ref?: Element | null
  }
  export interface DialogBackdropProps extends Assign<HTMLProps<'div'>, DialogBackdropBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
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
