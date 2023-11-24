import React, { useEffect, useState } from 'react'
import { ComparisonFunc, Conversion, Operator } from '../client/types'
import { useCollectorMutation } from './useCollectorMutation'
import getIsVisible from './useIsElementVisible'

// TODO: keeping here fo now in case we want to demo this. nuke it after
export const testConversion: Conversion = {
  identifier: 'test-id',
  signals: [
    {
      op: 'IsOnPath',
      parameters: ['starts_with', '/']
    },
    {
      op: 'CanSeeElementOnPage',
      parameters: ['#test', 'contains', '/']
    },
    {
      op: 'IsOnDomain',
      parameters: ['localhost']
    }
  ],
  analyticsEvent: 'unnecessary-event-ids'
}

/**
 * Returns a function that compares a string with the signal parameter
 */
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

/*
  Scans through the conversion signals and returns true if all of them are true
*/
const validateConversion = (conversion: Conversion) => {
  const signalPattern = conversion.signals.map((signal) => {
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

      const isVisible = getIsVisible(itemQuerySelector)
      return isVisible
    }
    if (signal.op === 'IsOnDomain') {
      return window.location.hostname === signal.parameters[0]
    }

    // in case the signal is mis-configured
    return false
  })

  return signalPattern.every(Boolean)
}

const scanInterval = 500

const useConversions = () => {
  const [conversions, setConversions] = useState<Conversion[]>([])

  const { mutate: collect } = useCollectorMutation()

  const removeById = React.useCallback(
    (id: string) => {
      setConversions((prev) => {
        if (!prev?.length) return prev

        return prev.filter((conversion) => conversion.identifier !== id)
      })
    },
    [setConversions]
  )

  // TODO: we really need to write unit tests for this bitch...

  const scan = React.useCallback(() => {
    conversions.forEach((conversion) => {
      const hasHappened = validateConversion(conversion)
      if (!hasHappened) return

      collect({
        conversion: { id: conversion.identifier }
      })

      removeById(conversion.identifier)
    })
  }, [collect, conversions, removeById])

  useEffect(() => {
    if (!conversions?.length) return

    const intId = setInterval(scan, scanInterval)
    return () => clearInterval(intId)
  }, [scan])

  return { conversions, setConversions }
}

export default useConversions
