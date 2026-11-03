'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";
import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

export interface TreeViewItemTextBaseProps extends PolymorphicProps {}
export interface TreeViewItemTextProps extends HTMLProps<'span'>, TreeViewItemTextBaseProps {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(nodeProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'
