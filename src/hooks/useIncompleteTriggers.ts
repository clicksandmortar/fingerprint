import React, { useEffect, useState } from 'react'
import { IncompleteTrigger, Trigger } from '../client/types'

import { validateSignalChain } from '../utils/signals'
import getIsVisible from './useIsElementVisible'

const interval = 250

const useIncompleteTriggers = () => {
  const [incompleteTriggers, setIncompleteTriggers] = useState<
    IncompleteTrigger[]
  >([])

  // @TODO: think if this can insteqd be a derived value somehow.
  // note that shoving the interval into a memo or callback is not the way.
  // IMHO we should aim to NOT update state here to reduce the amount of rerenders if possible.
  const [visibleTriggers, setVisibleTriggers] = useState<Trigger[]>([])

  const scan = React.useCallback(() => {
    const validTriggers = incompleteTriggers.filter((trigger) => {
      const shouldTrigger = validateSignalChain(trigger.signals)

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
