import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { fakeIncompleteTriggers } from '../utils/__dev/fakeTriggers'
import { getBrand } from '../utils/brand'
import { hostname, request } from '../utils/http'
import { getPagePayload } from '../utils/page'
import { useCollector } from './useCollector'
import { useFingerprint } from './useFingerprint'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { trackEvent } = useMixpanel()
  const { setPageTriggers, setIncompleteTriggers } = useCollector()

  const { visitor } = useVisitor()

  const trackTriggerSeen = React.useCallback(
    (trigger: Trigger) => {
      trackEvent('trigger_displayed', {
        triggerId: trigger.id,
        triggerType: trigger.invocation,
        triggerBehaviour: trigger.behaviour,
        time: new Date().toISOString(),
        brand: getBrand()
      })
    },
    [trackEvent]
  )

  return useMutation<Response, {}, unknown, unknown>(
    (trigger: Trigger) => {
      trackTriggerSeen(trigger)

      return request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id],
          visitor,
          page: getPagePayload()
        })
        .then((response) => {
          log('Seen mutation: response', response)
          return response
        })
        .catch((err) => {
          error('Seen mutation: error', err)
          return err
        })
    },
    {
      onSuccess: async (res) => {
        const r = await res.json()

        log('Seen mutation: replacing triggers with:', r.pageTriggers)
        setPageTriggers(r.pageTriggers)

        log(
          'Seen mutation: replacing incomplete Triggers with:',
          r.incompleteTriggers
        )
        // @ED: FIX THIS
        // setIncompleteTriggers(r.incompleteTriggers)
        setIncompleteTriggers(fakeIncompleteTriggers)
        return r
      }
    }
  )
}
