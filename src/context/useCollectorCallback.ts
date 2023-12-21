import React from 'react'
import { useEntireStore } from '../beautifulSugar/store'
import { CollectorVisitorResponse } from '../client/types'
import { useLogging } from '../hooks/useLogging'
import { updateCookie } from '../visitors/bootstrap'

const useCollectorCallback = () => {
  // needs:
  //    conversions
  //    setIdleTimeout
  //    intently

  const { setVisitor, set, setIncompleteTriggers, visitor } = useEntireStore()
  const { log } = useLogging()

  const collectorCallback = React.useCallback(
    async (response: Response) => {
      const payload: CollectorVisitorResponse = await response.json()

      log('Sent collector data, retrieved:', payload)

      const retrievedUserId = payload.identifiers?.main

      if (retrievedUserId) {
        updateCookie(retrievedUserId)
        setVisitor({ id: retrievedUserId })
      }

      set(() => ({
        pageTriggers: payload?.pageTriggers || [],
        config: payload?.config
      }))
      // Set IdleTimer
      // @todo turn this into the dynamic value
      setIdleTimeout(getIdleStatusDelay())
      setIncompleteTriggers(payload?.incompleteTriggers || [])
      setConversions(payload?.conversions || [])
      const cohort = payload.intently ? 'intently' : 'fingerprint'

      if (visitor.cohort !== cohort) setVisitor({ cohort })

      log('CollectorProvider: collected data')
      if (!payload.intently) {
        // remove intently overlay here
        log('CollectorProvider: user is in Fingerprint cohort')
        setIntently(false)
      } else {
        // show intently overlay here
        log('CollectorProvider: user is in Intently cohort')
        setIntently(true)
      }
    },
    [
      log,
      set,
      getIdleStatusDelay,
      setIncompleteTriggers,
      setConversions,
      visitor,
      setVisitor,
      pageTriggers,
      setIntently
    ]
  )

  return collectorCallback
}

export default useCollectorCallback
