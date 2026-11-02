/**
 * Application customization point: LocaleProvider sets locale and text direction.
 * API: LocaleProviderProps.locale is a BCP 47 language tag (for example en-GB or ar);
 * children is React content / a Svelte snippet. Nested providers override the locale.
 * Keep this provider outside controls that should share formatting and RTL behavior.
 * Usage: <LocaleProvider locale="ar">...controls...</LocaleProvider>
 * See https://ark-ui.com/docs/utilities/locale
 * This provider has no visual parts or optional CSS recipe.
 */
import './styles.css'
export * from '../../shared/src/svelte/ark/providers/locale/index.ts'
