<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { SwapProps } from '../svelte.ts'
  import { Swap as ComponentParts } from './ark/index.ts'

  let { on, off, parts = {} }: SwapProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Indicator {...parts.onIndicator} type="on">{@render on()}</ComponentParts.Indicator>
  <ComponentParts.Indicator {...parts.offIndicator} type="off">{@render off()}</ComponentParts.Indicator>
</ComponentParts.Root>
