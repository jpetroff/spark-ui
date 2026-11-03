import type { TreeSkipFn } from "@spark/shared/common/zag/collection/types.ts";
import type { Params } from "@spark/shared/common/zag/core/index.ts";
import type { TreeViewSchema } from "../tree-view.types.ts";

export function skipFn(params: Pick<Params<TreeViewSchema>, "prop" | "context">): TreeSkipFn<any> {
  const { prop, context } = params
  return function skip({ indexPath }) {
    const paths = prop("collection").getValuePath(indexPath).slice(0, -1)
    return paths.some((value) => !context.get("expandedValue").includes(value))
  }
}
