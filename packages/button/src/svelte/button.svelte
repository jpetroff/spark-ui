<script module lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { ButtonVariant, ButtonSize } from '../common/variants.ts'

  export type ButtonProps = HTMLButtonAttributes & {
    variant?: ButtonVariant
    size?: ButtonSize
    ref?: HTMLButtonElement | null
  }
</script>

<script lang="ts">
  import { cn } from '@spark/utils/spark-utils.ts'
  import { baseClass, variants, sizes } from '../common/variants.ts'

  let {
    class: className,
    variant = 'default',
    size = 'default',
    type = 'button',
    ref = $bindable(null),
    children,
    ...props
  }: ButtonProps = $props()
</script>

<button
  {...props}
  {type}
  bind:this={ref}
  data-slot="button"
  class={cn(baseClass, variants[variant], sizes[size], className)}
>
  {@render children?.()}
</button>
