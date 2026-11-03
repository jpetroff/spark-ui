<script module lang="ts">
  import type { FormatTimeOptions } from '@spark/shared/common/zag/i18n-utils/index.ts'

  export interface FormatTimeProps extends FormatTimeOptions {
    /**
     * The time to format
     */
    value: string | Date
  }
</script>

<script lang="ts">
  import { formatTime } from '@spark/shared/common/zag/i18n-utils/index.ts'
  import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";

  let { value, ...props }: FormatTimeProps = $props()

  const locale = useLocaleContext()
  const text = $derived(formatTime(value, locale().locale, props))
</script>

{text}
