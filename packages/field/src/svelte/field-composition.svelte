<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { FieldProps } from '../svelte.ts'
  import { Field } from './ark/index.ts'

  let { label, helperText, errorText, parts = {} }: FieldProps = $props()
</script>

<Field.Root {...parts.root}>
  <Field.Label {...parts.label}>
    {@render label()}
    <Field.RequiredIndicator {...parts.requiredIndicator} />
  </Field.Label>
  <Field.Input {...parts.input} />
  {#if helperText}
    <Field.HelperText {...parts.helperText}>{@render helperText()}</Field.HelperText>
  {/if}
  {#if errorText}
    <Field.ErrorText {...parts.errorText}>{@render errorText()}</Field.ErrorText>
  {/if}
</Field.Root>
