import { useState } from 'react'
import { ComparisonFunc, Conversion, Operator } from '../client/types'

type Props = {}

const getFuncByOperator = (
  operator: Operator,
  compareWith: string
): ComparisonFunc => {
  switch (operator) {
    case 'starts_with':
      return (comparison: string) => {
        return comparison.toLowerCase().startsWith(compareWith.toLowerCase())
      }
    case 'contains':
      return (comparison: string) => {
        return comparison.toLowerCase().includes(compareWith.toLowerCase())
      }
    case 'ends_with':
      return (comparison: string) => {
        return comparison.toLowerCase().endsWith(compareWith.toLowerCase())
      }
    case 'eq':
      return (comparison: string) => {
        return comparison.toLowerCase() === compareWith.toLowerCase()
      }
    default:
      return () => {
        console.error('getOperator: unknown operator', operator)
        return false
      }
  }
}

const useConversions = (props: Props) => {
  const [state, setState] = useState<Conversion[]>()
  // const {log} = useLogging();

  // TODO: write unit tests for this bitch
  const validateConversion = (conversion: Conversion) => {
    const signalmatch = conversion.signals.map((signal) => {
      if (signal.op === 'IsOnPath') {
        const [operator, route] = signal.parameters
        return getFuncByOperator(operator, route)(window.location.pathname)
      }

      if (signal.op === 'CanSeeElementOnPage') {
        const [itemQuerySelector, operator, route] = signal.parameters
        const isSignalOnCorrectRoute = getFuncByOperator(
          operator,
          route
        )(window.location.pathname)

        if (!isSignalOnCorrectRoute) return false

        const element = document.querySelector(itemQuerySelector)
        return !!element
      }
      if (signal.op === 'IsOnDomain') {
        return window.location.hostname === signal.parameters[0]
      }
    })
  }
}

export default useConversions
