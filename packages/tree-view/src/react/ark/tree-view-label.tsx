'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps extends HTMLProps<'h3'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = forwardRef<HTMLHeadingElement, TreeViewLabelProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <ark.h3 {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'
