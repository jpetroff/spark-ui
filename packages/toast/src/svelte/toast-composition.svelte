<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { ToastProps } from '../svelte.ts'
  import { Toast as ComponentParts } from './ark/index.ts'

  let props: ToastProps = $props()
</script>

<ComponentParts.Root {...props} />
