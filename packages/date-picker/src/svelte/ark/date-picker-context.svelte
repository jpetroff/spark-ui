<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDatePickerContext } from "./use-date-picker-context.ts";

  export interface DatePickerContextProps {
    render: Snippet<[UseDatePickerContext]>
  }
</script>

<script lang="ts">
  import { useDatePickerContext } from "./use-date-picker-context.ts";

  let { render }: DatePickerContextProps = $props()

  const context = useDatePickerContext()
</script>

{@render render(context)}
