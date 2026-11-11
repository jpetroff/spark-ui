import { useEffect } from 'react'

const attribute = 'data-canvas-outline'
const borderSides = ['Top', 'Right', 'Bottom', 'Left'] as const

/** Inspect rendered styles so nested components and portals need no debug props. */
export function useStructureOutlines(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const marked = new Set<HTMLDivElement>()

    function inspect() {
      frame = 0
      for (const element of marked) {
        if (!element.isConnected) {
          element.removeAttribute(attribute)
          marked.delete(element)
        }
      }

      for (const element of document.body.querySelectorAll('div')) {
        const style = getComputedStyle(element)
        const bordered = borderSides.some((side) => {
          const borderStyle = style[`border${side}Style`]
          return (
            parseFloat(style[`border${side}Width`]) > 0 &&
            borderStyle !== 'none' &&
            borderStyle !== 'hidden'
          )
        })

        if (bordered) {
          if (marked.delete(element)) element.removeAttribute(attribute)
        } else if (!element.hasAttribute(attribute)) {
          element.setAttribute(attribute, '')
          marked.add(element)
        }
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(inspect)
    }

    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.attributeName !== attribute)) schedule()
    })
    // Include head mutations: Vite replaces stylesheet text during CSS HMR.
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    })

    const events = [
      'pointerover',
      'pointerout',
      'pointerdown',
      'pointerup',
      'focusin',
      'focusout',
      'input',
      'change',
      'click',
      'keyup',
      'transitionend',
      'animationend',
      'load',
    ] as const
    for (const event of events) document.addEventListener(event, schedule, true)
    window.addEventListener('resize', schedule)
    import.meta.hot?.on('vite:afterUpdate', schedule)
    schedule()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      for (const event of events) document.removeEventListener(event, schedule, true)
      window.removeEventListener('resize', schedule)
      import.meta.hot?.off('vite:afterUpdate', schedule)
      for (const element of marked) element.removeAttribute(attribute)
    }
  }, [enabled])
}
