import React, { useEffect } from 'react'
import { useEntireStore } from '../beautifulSugar/store'
import { validateSignalChain } from '../utils/signals'

const interval = 250

const useIncompleteTriggers = () => {
  const { incompleteTriggers, setVisibleTriggersIssuedByIncomplete } =
    useEntireStore()

  const { set } = useEntireStore()

  const scan = React.useCallback(() => {
    const validTriggers = incompleteTriggers.filter((trigger) => {
      const shouldTrigger = validateSignalChain(trigger.signals)

      if (!shouldTrigger) return false
      return true
    })

    if (!validTriggers.length) return

    setVisibleTriggersIssuedByIncomplete(validTriggers)
  }, [set, incompleteTriggers, setVisibleTriggersIssuedByIncomplete])

  useEffect(() => {
    if (!incompleteTriggers.length) return

    const intId = setInterval(scan, interval)

    return () => {
      clearInterval(intId)
    }
  }, [incompleteTriggers, setVisibleTriggersIssuedByIncomplete])
}

export default useIncompleteTriggers
