import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { getBrand } from '../utils/brand'
import { hostname, request } from '../utils/http'
import { useCollector } from './useCollector'
import { useFingerprint } from './useFingerprint'

export const useSeenMutation = () => {
  const { log, error } = useLogging()
  const { appId } = useFingerprint()
  const { trackEvent } = useMixpanel()
  const { setPageTriggers } = useCollector()
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
          seenTriggerIDs: [trigger.id]
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
        if (!r.pageTriggers) return r

        log('Seen mutation: replacing triggers with:', r.pageTriggers)
        setPageTriggers(r.pageTriggers)
        return r
      }
    }
  )
}
