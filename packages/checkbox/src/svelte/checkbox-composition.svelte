<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { CheckboxProps } from '../svelte.ts'
  import { Checkbox } from './ark/index.ts'

  let { label, parts = {} }: CheckboxProps = $props()
</script>

<Checkbox.Root {...parts.root}>
  <Checkbox.Control {...parts.control}>
    <Checkbox.Indicator aria-hidden="true" {...parts.indicator}>✓</Checkbox.Indicator>
    <Checkbox.Indicator aria-hidden="true" {...parts.indeterminateIndicator} indeterminate>−</Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label {...parts.label}>{@render label()}</Checkbox.Label>
  <Checkbox.HiddenInput {...parts.hiddenInput} />
</Checkbox.Root>
