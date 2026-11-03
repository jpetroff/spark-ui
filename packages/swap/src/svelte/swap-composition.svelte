<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { SwapProps } from '../svelte.ts'
  import { Swap as ComponentParts } from './ark/index.ts'

  let props: SwapProps = $props()
</script>

<ComponentParts.Root {...props} />
