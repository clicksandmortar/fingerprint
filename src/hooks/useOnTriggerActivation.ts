import React from 'react'
import { CollectorVisitorResponse, Trigger } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { getBrand } from '../utils/brand'
import { hostname, request } from '../utils/http'
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
    // @TODO: make it dryer. Collector uses it too.
    const params: any = new URLSearchParams(window.location.search)
      .toString()
      .split('&')
      .reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        if (!key) return acc
        acc[key] = value
        return acc
      }, {})

    try {
      request
        .put(`${hostname}/triggers/${appId}/${visitorId}/seen`, {
          seenTriggerIDs: [trigger.id],
          appId,

          // @TODO: Ed to abstract all this crap away
          page: {
            url: window.location.href,
            path: window.location.pathname,
            title: document.title,
            params
          }
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
