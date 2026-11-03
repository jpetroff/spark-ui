'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { Collapsible } from "@spark/collapsible/react/ark/index.ts";
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";
import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

export interface TreeViewBranchContentBaseProps extends PolymorphicProps {}
export interface TreeViewBranchContentProps extends HTMLProps<'div'>, TreeViewBranchContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean | undefined
  'data-state'?: string | undefined
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const TreeViewBranchContent = forwardRef<HTMLDivElement, TreeViewBranchContentProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const contentProps = treeView.getBranchContentProps(nodeProps)

  const [, branchContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])
  const mergedProps = mergeProps(branchContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
