import React, { useEffect } from 'react'
import { useEntireStore } from '../beautifulSugar/store'
import { ComparisonFunc, Operator } from '../client/types'
import { validateSignalChain } from '../utils/signals'
import { useCollectorMutation } from './api/useCollectorMutation'

// TODO: move into utils/signals
/**
 * Returns a function that compares a string with the signal parameter
 */
export const getFuncByOperator = (
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

const scanInterval = 500

const useConversions = () => {
  const {
    conversions: { conversions },
    set
  } = useEntireStore()

  const { mutate: collect } = useCollectorMutation()

  const removeById = React.useCallback(
    (id: string) => {
      set((prev) => {
        if (!prev?.conversions.conversions.length) return prev

        const filteredConversions = prev.conversions.conversions.filter(
          (conversion) => conversion.identifier !== id
        )

        return {
          ...prev,
          conversions: {
            ...prev.conversions,
            conversions: filteredConversions
          }
        }
      })
    },
    [set]
  )

  const scan = React.useCallback(() => {
    conversions.forEach((conversion) => {
      const hasHappened = validateSignalChain(conversion.signals)
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
}

export default useConversions
