'use client'

/**
 * Application customization point: EnvironmentProvider supplies a document/root node.
 * API: EnvironmentProviderProps.value accepts a root node or a function returning it;
 * children is React content / a Svelte snippet. Omit value for the default document.
 * For an iframe or shadow root, pass a function that reads the mounted root lazily.
 * Usage: <EnvironmentProvider value={() => frame.contentDocument}>...controls...</EnvironmentProvider>
 * Ensure the function returns a mounted root (not null) before rendering controls.
 * See https://ark-ui.com/docs/utilities/environment
 * This provider has no visual parts or optional CSS recipe.
 */
import './styles.css'
export * from '../../shared/src/react/ark/providers/environment/index.ts'
