/* eslint-disable require-jsdoc */

import React from 'react'
import { useEntireStore } from '../beautifulSugar/store'
import { CollectorVisitorResponse, Trigger } from '../client/types'
import { useLogging } from '../hooks/useLogging'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import {
  fakeBanners,
  fakeCountdownModal,
  fakeDataCaptureModal,
  fakeTriggers
} from '../utils/__dev__/triggers.fake'
import { updateCookie } from '../visitors/bootstrap'

const useCollectorCallback = () => {
  const { getIdleStatusDelay } = useTriggerDelay()

  const {
    idleTime: { setIdleTimeout },
    setVisitor,
    set,
    setIncompleteTriggers,
    visitor,
    setIntently,
    setConversions
  } = useEntireStore()

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
        pageTriggers: [
          fakeDataCaptureModal,
          fakeBanners,
          fakeCountdownModal,
          ...fakeTriggers
        ] as Trigger[],
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
