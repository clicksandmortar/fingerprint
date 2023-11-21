import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { areNodeListsEqual } from '../utils/html'
import { isUndefined } from '../utils/page'
import { useCollectorMutation } from './useCollectorMutation'

// prepends a dot to the class name and joins multiple classes with dots to make a valid CSS selector
export const getButtonSelector = (el: HTMLButtonElement) => {
  if (!el.className) return ''

  const selectifiedClassName = el.className.split(' ').join('.')

  // we could also append an id to the selector, but we're already sending the id as a separate field
  return `button.${selectifiedClassName}`
}

const getPotentialButton = (el: Element): Element | null => {
  if (!el) return null
  if (el.nodeName?.toLowerCase() === 'button') return el
  if (el.parentElement) return getPotentialButton(el.parentElement)

  return null
}

const scanIntervalMs = 1000

/**
 * Hook into buttons on the page and collect their data

* 4. 
 */
export default function useButtonCollector() {
  const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor()
  const { log } = useLogging()

  // any, just because TS complains about NodeList not being iterable
  const [nodeList, setNodeList] = useState<any>()

  useEffect(() => {
    if (isUndefined('document')) return

    const intId = setInterval(() => {
      const buttons = document.querySelectorAll('button')
      if (areNodeListsEqual(buttons, nodeList)) return

      setNodeList(buttons)
    }, scanIntervalMs)

    return () => clearInterval(intId)
  }, [setNodeList, nodeList])

  useEffect(() => {
    if (isUndefined('document')) return
    if (!nodeList) return
    if (!visitor.id) return

    const buttonClickListener = (e: any) => {
      if (!e.target) return
      log('useButtonCollector: clicked element', { target: e.target })

      const potentialButton = getPotentialButton(e.target)

      // makes sure we fire this when clicking on a nested item inside a button
      if (!potentialButton) return

      const button = potentialButton as HTMLButtonElement

      log('useButtonCollector: button clicked', { button })
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
    }

    // setting one listener on the entire doc rather than for each button
    // TODO: See if the same can be applied to simplify the form collector logic
    document.addEventListener('click', buttonClickListener)

    return () => {
      document.removeEventListener('click', buttonClickListener)
    }
  }, [visitor, nodeList])
}
