<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseDatePickerReturn } from "./use-date-picker.svelte.ts";

  interface RootProviderProps {
    value: UseDatePickerReturn
  }

  export interface DatePickerRootProviderBaseProps
    extends RootProviderProps, UsePresenceProps, PolymorphicProps<'div'> {}
  export interface DatePickerRootProviderProps extends Assign<HTMLProps<'div'>, DatePickerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { DatePickerProvider } from "./use-date-picker-context.ts";

  const { value, ...props }: DatePickerRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-root' }, value().getRootProps(), localProps))

  DatePickerProvider(() => value())
  PresenceProvider(presence)
</script>

<Ark as="div" {...mergedProps} />
