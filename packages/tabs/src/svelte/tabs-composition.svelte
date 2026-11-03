<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { TabsProps } from '../svelte.ts'
  import { Tabs as ComponentParts } from './ark/index.ts'

  let props: TabsProps = $props()
</script>

<ComponentParts.Root {...props} />
