import React, { useEffect } from 'react'
import { isUndefined } from '../utils/page'
import { useCollectorMutation } from './api/useCollectorMutation'
import { useVisitor } from './init/useInitVisitor'
import { useLogging } from './useLogging'
import { useTracking } from './useTracking'

// prepends a dot to the class name and joins multiple classes with dots to make a valid CSS selector
export const getButtonSelector = (el: HTMLButtonElement) => {
  if (!el.className) return ''

  const selectifiedClassName = el.className.split(' ').join('.')

  // we could also append an id to the selector, but we're already sending the id as a separate field
  return `button.${selectifiedClassName}`
}

// When a user clicks an element inside a button, it will be the target of the click event
// To make sure we target the actual button, we need to recursively check the parent elements
// until we find a button. If one isn't located - we return null
const getRecursivelyPotentialButton = (el: Element): Element | null => {
  if (!el) return null
  if (el.nodeName?.toLowerCase() === 'button') return el
  if (el.parentElement) return getRecursivelyPotentialButton(el.parentElement)

  return null
}

/**
 * Hook into buttons on the page and collect their data

* 4. 
 */
export default function useButtonCollector() {
  const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  const { trackEvent } = useTracking()
  // console.log({ trackEvent })

  const buttonClickListener = React.useCallback(
    (e: any) => {
      if (!e.target) return
      const potentialButton = getRecursivelyPotentialButton(e.target)
      // makes sure we fire this when clicking on a nested item inside a button
      if (!potentialButton) return
      const button = potentialButton as HTMLButtonElement
      // we dont want to track submitions. useFormCollector is responsible for that
      if (button.type === 'submit') return
      log('useButtonCollector: button clicked', { button })
      trackEvent('button_clicked', {
        id: button.getAttribute('id'),
        name: button.getAttribute('name'),
        class: button.getAttribute('className'),
        type: button.getAttribute('type'),
        text: button.innerText
      })
      collect({
        button: {
          id: button.id,
          // adding button inner text as selector for now
          // in case we need it to make sure we're targeting the right button
          selector: button.innerText
          // might want to use the class name as a selector in the future, but
          // for the current implementation inner text is more valuable
          // selector: getButtonSelector(button)
        }
      })
    },
    [collect, log, trackEvent]
  )

  useEffect(() => {
    if (isUndefined('document')) return
    if (!visitor.id) return

    // setting one listener on the entire doc rather than for each button
    // TODO: See if the same can be applied to simplify the form collector logic
    document.addEventListener('click', buttonClickListener)

    return () => {
      document.removeEventListener('click', buttonClickListener)
    }
  }, [buttonClickListener, visitor])
}
