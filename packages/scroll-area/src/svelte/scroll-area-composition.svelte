<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { ScrollAreaProps } from '../svelte.ts'
  import { ScrollArea as ComponentParts } from './ark/index.ts'

  let props: ScrollAreaProps = $props()
</script>

<ComponentParts.Root {...props} />
