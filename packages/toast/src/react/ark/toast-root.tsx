'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { type ReactNode, cloneElement, forwardRef, isValidElement } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useToastContext } from "./use-toast-context.ts";

export interface ToastRootBaseProps extends PolymorphicProps {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>((props, ref) => {
  const { asChild, children, ...localProps } = props
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getRootProps(), localProps)

  const withGhosts = (content: ReactNode) => (
    <>
      <div {...toast.getGhostBeforeProps()} />
      {content}
      <div {...toast.getGhostAfterProps()} />
    </>
  )

  const asChildContent = () => {
    if (!isValidElement<{ children?: ReactNode }>(children)) return children
    return cloneElement(children, undefined, withGhosts(children.props.children))
  }

  return (
    <ark.div {...mergedProps} asChild={asChild} ref={ref}>
      {asChild ? asChildContent() : withGhosts(children)}
    </ark.div>
  )
})

ToastRoot.displayName = 'ToastRoot'
