import React from 'react'
import { CollectorVisitorResponse, Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { getBrand } from '../utils/brand'
import { request } from '../utils/http'
import { getPagePayload } from '../utils/page'
import { useCollector } from './useCollector'
import { useFingerprint } from './useFingerprint'
import { useEnvVars } from './useEnvVars'

const useOnTriggerActivation = (trigger: Trigger) => {
  const { trackEvent } = useMixpanel()
  const { appId } = useFingerprint()
  const { setPageTriggers } = useCollector()
  const { FINGERPRINT_API_HOSTNAME } = useEnvVars()
  const { visitor } = useVisitor()
  const { log, error } = useLogging()
  const { id: visitorId } = visitor

  return React.useCallback(() => {
    try {
      request
        .put(
          `${FINGERPRINT_API_HOSTNAME}/triggers/${appId}/${visitorId}/seen`,
          {
            seenTriggerIDs: [trigger.id],
            appId,
            page: getPagePayload()
          }
        )
        .then(async (r) => {
          const payload: CollectorVisitorResponse = await r.json()

          // no pageTriggers = no triggers, rather than missing key. serverside omition. Means we set pagetriggers to nothing.
          setPageTriggers(payload?.pageTriggers)
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
