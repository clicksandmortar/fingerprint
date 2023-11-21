import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { useVisitor } from '../context/VisitorContext'
import { isUndefined } from '../utils/page'
import { useCollectorMutation } from './useCollectorMutation'

const stringIsSubstringOf = (a: string, b: string) => {
  if (a === b) return true
  if (!a || !b) return false

  return a.toLowerCase().includes(b.toLowerCase())
}

// scanning any deeper isn't necessary. The form fields and their values are picked up at submit-time.
function isEqual(nodeList1: NodeList, nodeList2: NodeList) {
  if (nodeList1?.length !== nodeList2?.length) {
    return false
  }

  const largerList =
    nodeList1?.length > nodeList2?.length ? nodeList1 : nodeList2

  // classic for loops are most performant 🤷🏻‍♀️
  for (let i = 0; i < largerList?.length; i++) {
    if (nodeList1[i] !== nodeList2[i]) {
      return false
    }
  }

  return true
}

const bannedTypes = ['password', 'submit']
const bannedFieldPartialNames = [
  'expir',
  'cvv',
  'cvc',
  'csv',
  'csc',
  'pin',
  'pass',
  'card'
]

const scanIntervalMs = 1000

/**
 * Hook into forms on the page and collect their data
* Principle:
* 1. Scan for forms on the page every `scanIntervalMs` ms
* 2. When a form is detected, add a listener to it. If there are multiple forms,
*    add a listener to each of them.
* 2.1 Continue looking for forms. If more forms are found (or if fewer) remove all listeners
*     and add them again - to make sure we are listening to each form only once.

* 3. When the form is "submitted":
  (DO NOT PREVENT DEFAULT BEHAVIOUR. Hell knows if the form is actually submitted or if its behaviour is hijacked)
    3.1 filter out the fields based with sensitive information
    3.2 Use whatever property of the input is available as the field name: name, id, placeholder, type.
    3.3 collect the data and send it to the server
    3.4 without waiting for the server response, continue with the default behaviour
* 4. 
 */
export default function useFormCollector() {
  const { mutateAsync: collect } = useCollectorMutation()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  // any, just because TS complains about NodeList not being iterable
  const [nodeList, setNodeList] = useState<any>()

  useEffect(() => {
    if (isUndefined('document')) return

    const intId = setInterval(() => {
      const forms = document.querySelectorAll('form')
      if (isEqual(forms, nodeList)) return

      setNodeList(forms)
    }, scanIntervalMs)

    return () => clearInterval(intId)
  }, [setNodeList, nodeList])

  useEffect(() => {
    if (!nodeList) return
    if (!visitor.id) return
    if (isUndefined('document')) return

    const forms = document.querySelectorAll('form')

    const formSubmitListener = (e: any) => {
      const a = e?.target as HTMLFormElement

      const elements = Array.from(a.elements).filter((b: HTMLFormElement) => {
        if (bannedTypes.includes(b?.type)) return false

        if (
          bannedFieldPartialNames.find((partialName) => {
            if (stringIsSubstringOf(b.name, partialName)) return true
            if (stringIsSubstringOf(b.id, partialName)) return true
            if (stringIsSubstringOf(b.placeholder, partialName)) return true
            return false
          })
        )
          return false

        return true
      })

      const data = elements.reduce((result: any, item: any) => {
        let fieldName = item.name

        if (!fieldName) {
          if (item.id) {
            log(
              'useFormCollector: form field has no name, falling back to id',
              { item }
            )
            fieldName = item.id
          } else if (item.placeholder) {
            log(
              'useFormCollector: form field has no name or id, falling back to placeholder',
              { item }
            )
            fieldName = item.placeholder
          } else {
            log(
              'useFormCollector: form field has no name, id or placeholder, fallback to type',
              { item }
            )
            fieldName = item.type
          }
        }
        result[fieldName] = item.value
        return result
      }, {})

      log('useFormCollector: form submitted', { data })

      collect({
        visitor,
        form: {
          data
        }
      })
    }

    // reset listeners, so we never end up listening to the same form twice
    forms.forEach((f) => f.removeEventListener('submit', formSubmitListener))
    forms.forEach((f) => f.addEventListener('submit', formSubmitListener))

    return () => {
      forms.forEach((f) => f.removeEventListener('submit', formSubmitListener))
    }
  }, [visitor, nodeList])
}
