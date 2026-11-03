<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { SwitchProps } from '../svelte.ts'
  import { Switch as ComponentParts } from './ark/index.ts'

  let props: SwitchProps = $props()
</script>

<ComponentParts.Root {...props} />
