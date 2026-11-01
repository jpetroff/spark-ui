import { getActiveElement } from "../dom-query/index.ts";
import { getDocument } from "../dom-query/index.ts";
import { isActiveElement } from "../dom-query/index.ts";
import type { Scope } from "./types.ts";

export function createScope(props: Pick<Scope, "id" | "ids" | "getRootNode">) {
  const getRootNode = () => (props.getRootNode?.() ?? document) as Document | ShadowRoot
  const getDoc = () => getDocument(getRootNode())
  const getWin = () => getDoc().defaultView ?? window
  const getActiveElementFn = () => getActiveElement(getRootNode())
  const getById = <T extends Element = HTMLElement>(id: string) => getRootNode().getElementById(id) as T | null
  return {
    ...props,
    getRootNode,
    getDoc,
    getWin,
    getActiveElement: getActiveElementFn,
    isActiveElement,
    getById,
  }
}
