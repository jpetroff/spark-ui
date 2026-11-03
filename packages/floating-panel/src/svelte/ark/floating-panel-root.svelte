<script lang="ts" module>
  import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseFloatingPanelProps } from "./use-floating-panel.svelte.ts";

  export interface FloatingPanelRootBaseProps
    extends UseFloatingPanelProps, UsePresenceProps, PolymorphicProps<'div'> {}
  export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { FloatingPanelProvider } from "./use-floating-panel-context.ts";
  import { useFloatingPanel } from "./use-floating-panel.svelte.ts";

  let { open = $bindable(), position = $bindable(), size = $bindable(), ...props }: FloatingPanelRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, otherProps] = $derived(splitPresenceProps(props))
  const [floatingPanelProps, localProps] = $derived(
    createSplitProps<UseFloatingPanelProps>()(otherProps, [
      'allowOverflow',
      'closeOnEscape',
      'defaultOpen',
      'defaultPosition',
      'defaultSize',
      'dir',
      'disabled',
      'draggable',
      'getAnchorPosition',
      'getBoundaryEl',
      'gridSize',
      'finalFocusEl',
      'id',
      'ids',
      'initialFocusEl',
      'lockAspectRatio',
      'maxSize',
      'minSize',
      'onOpenChange',
      'onPositionChange',
      'onPositionChangeEnd',
      'onSizeChange',
      'onSizeChangeEnd',
      'onStageChange',
      'open',
      'persistRect',
      'position',
      'resizable',
      'restoreFocus',
      'size',
      'strategy',
      'translations',
    ]),
  )

  const resolvedProps = $derived<UseFloatingPanelProps>({
    ...floatingPanelProps,
    id: floatingPanelProps.id ?? providedId,
    open,
    onOpenChange(details) {
      floatingPanelProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    position,
    onPositionChange(details) {
      floatingPanelProps.onPositionChange?.(details)
      if (position !== undefined) position = details.position
    },
    size,
    onSizeChange(details) {
      floatingPanelProps.onSizeChange?.(details)
      if (size !== undefined) size = details.size
    },
  })

  const floatingPanel = useFloatingPanel(() => resolvedProps)
  FloatingPanelProvider(floatingPanel)

  const usePresenceProps = $derived(mergeProps({ present: floatingPanel().open }, presenceProps))
  const presence = usePresence(() => usePresenceProps)

  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
