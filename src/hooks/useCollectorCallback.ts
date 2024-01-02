import React from 'react'
import { useEntireStore } from '../beautifulSugar/store'
import { CollectorVisitorResponse } from '../client/types'
import { updateCookie } from '../visitors/bootstrap'
import { useLogging } from './useLogging'
import { useTriggerDelay } from './useTriggerDelay'

const useCollectorCallback = () => {
  const { getIdleStatusDelay } = useTriggerDelay()

  const {
    idleTime: { setIdleTimeout },
    setVisitor,
    set,
    setIncompleteTriggers,
    visitor,
    setIntently,
    setConversions,
    setPageTriggers
  } = useEntireStore()

  const { log } = useLogging()

  const collectorCallback = React.useCallback(
    async (response: Response) => {
      const payload: CollectorVisitorResponse = await response.json()

      log('Retrieved payload from target engine:', payload)

      setPageTriggers(payload?.pageTriggers || [])
      setConversions(payload.conversions || [])

      const retrievedUserId = payload.identifiers?.main
      if (retrievedUserId) {
        updateCookie(retrievedUserId)
        setVisitor({ id: retrievedUserId })
      }

      setIdleTimeout(getIdleStatusDelay())
      setIncompleteTriggers(payload?.incompleteTriggers || [])
      setConversions(payload?.conversions || [])

      const cohort = payload.intently ? 'intently' : 'fingerprint'
      if (visitor.cohort !== cohort) setVisitor({ cohort })

      log('CollectorProvider: collected data')

      if (!payload.intently) {
        log('CollectorProvider: user is in Fingerprint cohort')
        setIntently(false)
      } else {
        log('CollectorProvider: user is in Intently cohort')
        setIntently(true)
      }

      return response
    },
    [
      log,
      set,
      setIdleTimeout,
      getIdleStatusDelay,
      setIncompleteTriggers,
      setConversions,
      visitor.cohort,
      setVisitor,
      setIntently
    ]
  )

  return collectorCallback
}

export default useCollectorCallback
