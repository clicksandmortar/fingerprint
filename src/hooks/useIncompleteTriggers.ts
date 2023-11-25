import React, { useEffect, useState } from 'react'
import { IncompleteTrigger, Trigger } from '../client/types'

import { validateConversion } from './useConversions'
import getIsVisible from './useIsElementVisible'

/*
  Scans through the conversion signals and returns true if all of them are true
*/
// export const validateSignals = (signals: Conversion['signals']) => {
//   const signalPattern = signals.map((signal) => {
//     if (signal.op === 'IsOnPath') {
//       const [route] = signal.parameters

//       //HARDCODING TO CONTAINS FOR NOW UNTIL FIXED
//       return getFuncByOperator('contains', route)(window.location.pathname)
//     }

//     if (signal.op === 'CanSeeElementOnPage') {
//       const [itemQuerySelector, operator, route] = signal.parameters
//       const isSignalOnCorrectRoute = getFuncByOperator(
//         operator,
//         route
//       )(window.location.pathname)

//       if (!isSignalOnCorrectRoute) return false

//       const isVisible = getIsVisible(itemQuerySelector)
//       return isVisible
//     }
//     if (signal.op === 'IsOnDomain') {
//       return window.location.hostname === signal.parameters[0]
//     }

//     // in case the signal is mis-configured
//     return false
//   })

//   console.log('signalPattern', signalPattern)
//   return signalPattern.every(Boolean)
// }

const interval = 250

const useIncompleteTriggers = () => {
  const [incompleteTriggers, setIncompleteTriggers] = useState<
    IncompleteTrigger[]
  >([])

  const [visibleTriggers, setVisibleTriggers] = useState<Trigger[]>([])

  const scan = React.useCallback(() => {
    const validTriggers = incompleteTriggers.filter((trigger) => {
      const shouldTrigger = validateConversion(trigger.signals)

      if (!shouldTrigger) return false
      return true
    })

    setVisibleTriggers((prev) => {
      if (!validTriggers.length) return prev

      return validTriggers
    })
  }, [setVisibleTriggers, incompleteTriggers])

  useEffect(() => {
    if (!incompleteTriggers.length) return

    const intId = setInterval(scan, interval)

    return () => {
      clearInterval(intId)
    }
  }, [incompleteTriggers, getIsVisible, setVisibleTriggers])

  return {
    incompleteTriggers,
    setIncompleteTriggers,
    visibleTriggers
  }
}

export default useIncompleteTriggers
