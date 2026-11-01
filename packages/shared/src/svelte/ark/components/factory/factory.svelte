<script lang="ts" generics="T extends keyof SvelteHTMLElements">
  import type { HTMLProps } from "../../types.ts";
import type { PolymorphicProps } from "../../types.ts";
import type { PropsFn } from "../../types.ts";
  import { isVoidHTMLTag } from "../../utils/tags.ts";
import { isVoidSVGTag } from "../../utils/tags.ts";
  import { mergeProps } from '../../../zag/index.ts'
  import { createAttachmentKey } from 'svelte/attachments'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import Svg from './svg-factory.svelte'

  type Props = HTMLProps<T> &
    PolymorphicProps<T> & {
      /**
       * The HTML tag of the component.
       */
      as: T
      /**
       * The bindable ref of the component.
       */
      ref?: Element | null
    }

  let { asChild, children, as, ref = $bindable(null), ...rest }: Props = $props()

  const refKey = createAttachmentKey()

  const setRef = (node: Element) => {
    ref = node
    return () => {
      if (ref === node) ref = null
    }
  }

  const propsFn: PropsFn<T> = (props) => mergeProps(rest, props ?? {}, { [refKey]: setRef })
</script>

{#if asChild}
  {@render asChild?.(propsFn)}
{:else if isVoidSVGTag(as)}
  <Svg {as} {...rest} bind:ref />
{:else if isVoidHTMLTag(as)}
  <svelte:element this={as} {...rest} bind:this={ref} />
{:else if as === 'textarea'}
  <textarea {...rest} bind:this={ref}></textarea>
{:else}
  <svelte:element this={as} {...rest} bind:this={ref}>
    {@render children?.()}
  </svelte:element>
{/if}
