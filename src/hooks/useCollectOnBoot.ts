import { useEffect } from 'react'
import { CollectorResponse } from '../client/types'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { hasVisitorIDInURL } from '../utils/visitor_id'
import { useCollector } from './useCollector'
import { useCollectorMutation } from './useCollectorMutation'
import { useFingerprint } from './useFingerprint'

const useCollectOnBoot = () => {
  const { log, error } = useLogging()
  const { appId, booted, initialDelay } = useFingerprint()

  // TODO: pull out of there...
  const { addPageTriggers, setIntently } = useCollector()

  const { visitor, session } = useVisitor()

  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()

  // @todo this should be invoked when booted
  // and then on any window page URL changes.
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot')
      return
    }

    const delay = setTimeout(() => {
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID')
        return
      }

      log('CollectorProvider: collecting data')

      if (hasVisitorIDInURL()) {
        trackEvent('abandoned_journey_landing', {
          from_email: true
        })
      }

      const params: any = new URLSearchParams(window.location.search)
        .toString()
        .split('&')
        .reduce((acc, cur) => {
          const [key, value] = cur.split('=')
          if (!key) return acc
          acc[key] = value
          return acc
        }, {})

      const hash: string = window.location.hash.substring(3)

      const hashParams = hash.split('&').reduce((result: any, item: any) => {
        const parts = item.split('=')
        result[parts[0]] = parts[1]
        return result
      }, {})

      if (hashParams.id_token) {
        log('CollectorProvider: user logged in event fired')
        trackEvent('user_logged_in', {})

        collect({
          appId,
          visitor,
          sessionId: session?.id,
          account: {
            token: hashParams.id_token
          }
        })
          .then(async (response: Response) => {
            const payload: CollectorResponse = await response.json()

            log('Sent login collector data, retrieved:', payload)
          })
          .catch((err) => {
            error('failed to store collected data', err)
          })
      }

      collect({
        appId,
        visitor,
        sessionId: session?.id,
        page: {
          url: window.location.href,
          path: window.location.pathname,
          title: document.title,
          params
        },
        referrer: {
          url: document.referrer,
          title: '',
          utm: {
            // eslint-disable-next-line camelcase
            source: params?.utm_source,
            // eslint-disable-next-line camelcase
            medium: params?.utm_medium,
            // eslint-disable-next-line camelcase
            campaign: params?.utm_campaign,
            // eslint-disable-next-line camelcase
            term: params?.utm_term,
            // eslint-disable-next-line camelcase
            content: params?.utm_content
          }
        }
      })
        .then(async (response: Response) => {
          if (response.status === 204) {
            setIntently(true)
            return
          }

          const payload: CollectorResponse = await response.json()

          log('Sent collector data, retrieved:', payload)

          // Set IdleTimer
          // @todo turn this into the dynamic value

          addPageTriggers(payload?.pageTriggers)

          if (!payload.intently) {
            // remove intently overlay here
            log('CollectorProvider: user is in Fingerprint cohort')
            setIntently(false)
            trackEvent('user_cohort', {
              cohort: 'fingerprint'
            })
          } else {
            // show intently overlay here
            log('CollectorProvider: user is in Intently cohort')
            setIntently(true)
            trackEvent('user_cohort', {
              cohort: 'intently'
            })
          }
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })

      log('CollectorProvider: collected data')
    }, initialDelay)

    return () => {
      clearTimeout(delay)
    }
  }, [
    appId,
    booted,
    collect,
    error,
    initialDelay,
    log,
    trackEvent,
    visitor,
    session?.id
  ])
}

export const WithCollectOnBoot = () => {
  useCollectOnBoot()

  return null
}

export default useCollectOnBoot
