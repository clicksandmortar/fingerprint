import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Trigger } from '../../client/types'
import { deviceInfo } from '../../utils/device'
import { hostname, request } from '../../utils/http'
import { getPagePayload } from '../../utils/page'
import { updateCookie } from '../../visitors/bootstrap'
import { useTracking } from '../init/useInitTracking'
import { useVisitor } from '../init/useInitVisitor'
import { useBrand } from '../useBrandConfig'
import { useCollector } from '../useCollector'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { trackEvent } = useTracking()
  const { setPageTriggers, setIncompleteTriggers, setConversions } =
    useCollector()

  const { visitor, setVisitor } = useVisitor()
  const brand = useBrand()

  const trackTriggerSeen = React.useCallback(
    (trigger: Trigger) => {
      trackEvent('trigger_displayed', {
        triggerId: trigger.id,
        triggerType: trigger.invocation,
        triggerBehaviour: trigger.behaviour,
        time: new Date().toISOString(),
        brand
      })
    },
    [trackEvent, brand]
  )

  return useMutation<Response, {}, unknown, unknown>(
    (trigger: Trigger) => {
      trackTriggerSeen(trigger)

      return request
        .put(`${hostname}/triggers/${appId}/${visitor.id}/seen`, {
          seenTriggerIDs: [trigger.id],
          visitor,
          page: getPagePayload(),
          device: deviceInfo
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
      // TODO: merge this and collecor callback into one thing when we no longer require
      // setting intently - thats the only differentiator between the callbacks
      onSuccess: async (res) => {
        const r = await res.json()

        log('Seen mutation: replacing triggers with:', r.pageTriggers)
        setPageTriggers(r.pageTriggers)
        setConversions(r.conversions || [])

        const retrievedUserId = r.identifiers?.main
        if (retrievedUserId) {
          updateCookie(retrievedUserId)
          setVisitor({ id: retrievedUserId })
        }

        log(
          'Seen mutation: replacing incomplete Triggers with:',
          r.incompleteTriggers
        )

        setIncompleteTriggers(r.incompleteTriggers || [])
        return r
      }
    }
  )
}
