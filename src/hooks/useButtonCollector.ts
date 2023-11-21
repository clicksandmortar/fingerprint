import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { isUndefined } from '../utils/page'
import { useCollectorMutation } from './useCollectorMutation'

// prepends a dot to the class name and joins multiple classes with dots to make a valid CSS selector
// const getButtonSelector = (el: HTMLButtonElement) => {
//   if (!el.className) return ''

//   const selectifiedClassName = el.className.split(' ').join('.')

//   // we could also append an id to the selector, but we're already sending the id as a separate field

//   return `button.${selectifiedClassName}`
// }

// scanning any deeper isn't necessary. The button fields and their values are picked up at submit-time.
function isEqual(nodeList1: NodeList, nodeList2: NodeList) {
  if (nodeList1?.length !== nodeList2?.length) {
    return false
  }

  const largerList =
    nodeList1?.length > nodeList2?.length ? nodeList1 : nodeList2

  // classic for loops are most peformant 🤷🏻‍♀️
  for (let i = 0; i < largerList?.length; i++) {
    if (nodeList1[i] !== nodeList2[i]) {
      return false
    }
  }

  return true
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
      if (isEqual(buttons, nodeList)) return

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
      if (!e.target.nodeName) return
      // no, we don't want submit/reset types
      if (e.target.nodeName.toLowerCase() !== 'button') return

      const button = e.target as HTMLButtonElement

      log('useButtonCollector: button clicked', { button })
      collect({
        button: {
          id: button.id,
          // selector not used currently so providing a redundant
          // selector which we may use in the future
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
