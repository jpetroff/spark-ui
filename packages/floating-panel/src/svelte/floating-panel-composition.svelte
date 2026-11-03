<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { FloatingPanelProps } from '../svelte.ts'
  import { FloatingPanel as ComponentParts } from './ark/index.ts'

  let props: FloatingPanelProps = $props()
</script>

<ComponentParts.Root {...props} />
