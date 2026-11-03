'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";
import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTriggerProps extends HTMLProps<'div'>, TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTriggerProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
