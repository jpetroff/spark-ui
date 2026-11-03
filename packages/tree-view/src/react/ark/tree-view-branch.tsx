'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { useRenderStrategyPropsContext } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { Collapsible } from "@spark/collapsible/react/ark/index.ts";
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { useTreeViewContext } from "./use-tree-view-context.ts";
import { useTreeViewNodeContext } from "./use-tree-view-node-context.ts";
import { useTreeViewNodePropsContext } from "./use-tree-view-node-props-context.ts";

export interface TreeViewBranchBaseProps extends PolymorphicProps {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'div'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = forwardRef<HTMLDivElement, TreeViewBranchProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(treeView.getBranchProps(nodeProps), props)
  const branchContentProps = treeView.getBranchContentProps(nodeProps)

  return (
    <Collapsible.Root
      ref={ref}
      open={nodeState.expanded}
      ids={{ content: branchContentProps.id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
