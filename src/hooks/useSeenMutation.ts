import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Trigger } from '../client/types'
import { useBrand } from '../context/Config'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { hostname, request } from '../utils/http'
import { getPagePayload } from '../utils/page'
import { useCollector } from './useCollector'
import { useFingerprint } from './useFingerprint'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { trackEvent } = useMixpanel()
  const { setPageTriggers } = useCollector()
  const { visitor } = useVisitor()
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
      mutationKey: ['seen'],
      onSuccess: async (res) => {
        const r = await res.json()

        log('Seen mutation: replacing triggers with:', r.pageTriggers)
        // no pageTriggers = no triggers, rather than missing key. serverside omition. Means we set pagetriggers to nothing.
        setPageTriggers(r.pageTriggers)
        return r
      }
    }
  )
}
