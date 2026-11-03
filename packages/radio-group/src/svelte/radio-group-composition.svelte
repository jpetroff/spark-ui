<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { RadioGroupProps } from '../svelte.ts'
  import { RadioGroup as ComponentParts } from './ark/index.ts'

  let props: RadioGroupProps = $props()
</script>

<ComponentParts.Root {...props} />
