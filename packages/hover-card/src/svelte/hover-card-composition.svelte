<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { HoverCardProps } from '../svelte.ts'
  import { HoverCard as ComponentParts } from './ark/index.ts'

  let props: HoverCardProps = $props()
</script>

<ComponentParts.Root {...props} />
