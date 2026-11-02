'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { TriggerProps } from '../../common/zag/dialog/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DialogTriggerProps extends Assign<HTMLProps<'button'>, DialogTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const dialog = useDialogContext()
  const presence = usePresenceContext()

  const triggerPropsRaw = dialog.getTriggerProps(triggerProps)
  const mergedProps = mergeProps({ className: 'spark-dialog-trigger' },
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

DialogTrigger.displayName = 'DialogTrigger'
