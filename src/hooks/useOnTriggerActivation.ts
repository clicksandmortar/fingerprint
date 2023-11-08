import React from 'react'
import { CollectorVisitorResponse, Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { getBrand } from '../utils/brand'
import { hostname, request } from '../utils/http'
import { getPagePayload } from '../utils/page'
import { useCollector } from './useCollector'
import { useFingerprint } from './useFingerprint'

const useOnTriggerActivation = (trigger: Trigger) => {
  const { trackEvent } = useMixpanel()
  const { appId } = useFingerprint()
  const { setPageTriggers } = useCollector()
  const { visitor } = useVisitor()
  const { log, error } = useLogging()
  const { id: visitorId } = visitor

  return React.useCallback(() => {
    try {
      request
        .put(`${hostname}/triggers/${appId}/${visitorId}/seen`, {
          seenTriggerIDs: [trigger.id],
          appId,
          page: getPagePayload()
        })
        .then(async (r) => {
          const payload: CollectorVisitorResponse = await r.json()
          const newTriggers = payload?.pageTriggers
          if (!newTriggers) return

          setPageTriggers(newTriggers)
        })
    } catch (e) {
      error(e)
    }

    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.invocation,
      triggerBehaviour: trigger.behaviour,
      time: new Date().toISOString(),
      brand: getBrand()
    })
  }, [appId, error, log, trackEvent, trigger, visitorId])
}

export default useOnTriggerActivation
