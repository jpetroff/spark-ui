export const variants = { default: 'spark-button-default', secondary: 'spark-button-secondary', outline: 'spark-button-outline', ghost: 'spark-button-ghost' }
export const sizes = { default: 'spark-button-md', sm: 'spark-button-sm', lg: 'spark-button-lg', icon: 'spark-button-icon' }
export const baseClass = 'spark-button'
export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes
