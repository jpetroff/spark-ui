<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { NumberInputProps } from '../svelte.ts'
  import { NumberInput as ComponentParts } from './ark/index.ts'

  let props: NumberInputProps = $props()
</script>

<ComponentParts.Root {...props} />
