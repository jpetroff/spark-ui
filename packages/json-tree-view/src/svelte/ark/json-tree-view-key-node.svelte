<script lang="ts">
  import { type JsonNode, keyPathToKey } from '@spark/shared/common/zag/json-tree-utils/index.ts'

  interface JsonTreeViewKeyNodeProps {
    /**
     * The node to render.
     */
    node: JsonNode
    /**
     * Whether to show quotes on the key.
     */
    showQuotes?: boolean
  }

  let { node, showQuotes }: JsonTreeViewKeyNodeProps = $props()

  const key = $derived(keyPathToKey(node.keyPath))
</script>

<span data-kind="key" data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
  {showQuotes ? `"${key}"` : key}
</span>
<span data-kind="colon">:</span>
