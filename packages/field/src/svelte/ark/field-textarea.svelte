<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface FieldTextareaBaseProps extends PolymorphicProps<'textarea'>, RefAttribute {
    /**
     * Whether the textarea should autoresize
     * @default false
     */
    autoresize?: boolean
  }
  export interface FieldTextareaProps extends Assign<HTMLProps<'textarea'>, FieldTextareaBaseProps> {}
</script>

<script lang="ts">
  import { autoresizeTextarea } from '../../../../shared/src/common/zag/auto-resize/index.ts'
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "./use-field-context.ts";

  let { ref = $bindable(null), value = $bindable(), autoresize, ...props }: FieldTextareaProps = $props()

  let textareaRef = $state<HTMLTextAreaElement | null>(null)
  $effect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef)
  })

  const field = useFieldContext()

  const nativeTextareaProps: HTMLProps<'textarea'> = $derived({
    value,
    oninput(e) {
      value = e.currentTarget.value
    },
    style: autoresize ? 'resize: none' : undefined,
  })

  const mergedProps = $derived(mergeProps(field?.()?.getTextareaProps() ?? {}, nativeTextareaProps, props))

  function setNode(node: HTMLTextAreaElement | null) {
    textareaRef = node
  }
</script>

<Ark as="textarea" bind:ref {...mergedProps} {@attach setNode} />
