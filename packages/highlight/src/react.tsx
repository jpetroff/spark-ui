'use client'

/**
 * Editable text-highlighting primitive. Query may be a string or an array of search terms.
 * Pass className (React) or class (Svelte) to style matching marks.
 * @example
 * <Highlight text="Components you own" query="own" />
 */
import './styles.css'

export * from './react/ark/index.ts'
