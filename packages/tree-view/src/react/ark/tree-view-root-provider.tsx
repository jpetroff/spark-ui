'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { type JSX, forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type RenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { RenderStrategyPropsProvider } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import type { TreeNode } from "@spark/collection/react/ark/tree-collection.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseTreeViewReturn } from "./use-tree-view.ts";
import { TreeViewProvider } from "./use-tree-view-context.ts";

interface RootProviderProps<T extends TreeNode> {
  value: UseTreeViewReturn<T>
}
export interface TreeViewRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface TreeViewRootProviderProps<T extends TreeNode>
  extends HTMLProps<'div'>, TreeViewRootProviderBaseProps<T> {}

const TreeViewImpl = <T extends TreeNode>(props: TreeViewRootProviderProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [{ value: treeView }, localProps] = createSplitProps<RootProviderProps<T>>()(treeViewProps, ['value'])
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeViewProvider>
  )
}

export type TreeViewRootProviderComponent<P = {}> = <T extends TreeNode>(
  props: Assign<TreeViewRootProviderProps<T>, P> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const TreeViewRootProvider = forwardRef(TreeViewImpl) as TreeViewRootProviderComponent
