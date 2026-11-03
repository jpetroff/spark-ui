<script lang="ts">
  import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
  import { normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
  import * as toast from '../../common/zag/toast/index.ts'
  import type { Snippet } from 'svelte'
  import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
  import { ToastProvider } from "./use-toast-context.ts";

  interface ToastItemProps {
    value: Accessor<toast.Props<Snippet>>
    parent: toast.GroupService
    index: number
    children: Snippet<[Accessor<toast.Options<Snippet>>]>
  }

  let { children, value, parent, index }: ToastItemProps = $props()

  const env = useEnvironmentContext()

  const machineProps = $derived.by(() => ({
    ...value(),
    parent,
    index,
    getRootNode: env().getRootNode,
  }))

  const service = useMachine(toast.machine, () => machineProps)
  const api = $derived(toast.connect(service, normalizeProps))

  ToastProvider(() => api)
</script>

{@render children(value)}
