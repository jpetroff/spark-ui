<script lang="ts">
  import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import { mergeProps, normalizeProps, useMachine } from '@spark/shared/svelte/zag/index.ts'
  import * as toast from '../../common/zag/toast/index.ts'
  import type { Snippet } from 'svelte'
  import { useEnvironmentContext } from "@spark/shared/svelte/ark/providers/index.ts";
import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import type { CreateToasterReturn } from "./create-toaster.ts";
  import ToasterItem from './toaster-item.svelte'

  export type ToastOptions = toast.Options<Snippet>

  export interface ToasterBaseProps extends Omit<toast.GroupProps, 'store' | 'id'>, RefAttribute {
    /**
     * The toaster instance.
     */
    toaster: CreateToasterReturn<any>
    /**
     * The children of the toaster.
     */
    children: Snippet<[Accessor<ToastOptions>]>
    /**
     * The human-readable label for the toast region.
     * @default "Notifications"
     */
    label?: string | undefined
  }

  export interface ToasterProps extends Assign<HTMLProps<'div'>, ToasterBaseProps> {}

  const id = $props.id()
  let { ref = $bindable(null), toaster, children, label, dir, getRootNode, ...otherProps }: ToasterProps = $props()

  const locale = useLocaleContext()
  const env = useEnvironmentContext()

  const machineProps = $derived.by(() => ({
    store: toaster,
    id,
    dir: dir ?? locale().dir,
    getRootNode: getRootNode ?? env().getRootNode,
  }))

  const service = useMachine(toast.group.machine, () => machineProps)

  const api = $derived(toast.group.connect(service, normalizeProps))
  const toasts = $derived(api.getToasts())

  const mergedProps = $derived(mergeProps(api.getGroupProps({ label }), otherProps))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {#each toasts as toast, index (toast.id)}
    {@const toastFn = () => toast}
    <ToasterItem value={toastFn} parent={service} {index}>
      {@render children(toastFn)}
    </ToasterItem>
  {/each}
</Ark>
