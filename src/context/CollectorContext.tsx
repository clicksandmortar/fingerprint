import unique from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { ClientTrigger, clientHandlers } from '../client/handler'
import { APITrigger, CollectorResponse, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import { useFingerprint } from '../hooks/useFingerprint'
import { useLogging } from './LoggingContext'
import { useMixpanel } from './MixpanelContext'
import { useVisitor } from './VisitorContext'

const defaultIdleStatusDelay = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Trigger[]
}

export function CollectorProvider({
  children,
  handlers = []
}: CollectorProviderProps) {
  const { log, error } = useLogging()
  const {
    appId,
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    config
  } = useFingerprint()
  const { visitor, session } = useVisitor()

  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()

  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })
  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    config?.idleDelay || defaultIdleStatusDelay
  )
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>(handlers || [])
  const [currentlyVisibleTriggerType, setCurrentlyVisibleTriggerType] =
    useState<Trigger['invocation'] | undefined>(undefined)
  const [intently, setIntently] = useState<boolean>(false)

  const addPageTriggers = (triggers: Trigger[]) => {
    setPageTriggers((prev) => unique<Trigger>([...prev, ...triggers], 'id'))
  }

  useEffect(() => {
    addPageTriggers(handlers)
  }, [handlers])

  log('CollectorProvider: user is on mobile?', isMobile)

  const shouldLaunchIdleTriggers = isMobile || config?.trackIdleOnDesktop

  // Removes the intently overlay, if intently is false
  useEffect(() => {
    if (intently) return

    log('CollectorProvider: removing intently overlay')

    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll(
        'div[id^=smc-v5-overlay-]'
      )

      Array.prototype.forEach.call(locatedIntentlyScript, (node: any) => {
        node.parentNode.removeChild(node)

        log('CollectorProvider: successfully removed intently overlay')

        clearInterval(runningInterval)
      })
    }, 100)

    return () => {
      clearInterval(runningInterval)
    }
  }, [intently, log])

  const invokeAPITrigger = (locatedTrigger: APITrigger) => {
    const handler = clientHandlers.find(
      (h) => h.behaviour === locatedTrigger.behaviour
    )

    if (!handler) return null
    if (!handler?.invoke) return null
    const potentialComponent = handler.invoke(locatedTrigger)

    if (potentialComponent && React.isValidElement(potentialComponent))
      return potentialComponent

    return null
  }
  const invokeCustomTrigger = (trigger: ClientTrigger) => {
    const potentialComponent = trigger.invoke?.(trigger)

    if (potentialComponent && React.isValidElement(potentialComponent))
      return potentialComponent

    return null
  }

  const TriggerComponent = React.useCallback(() => {
    if (!currentlyVisibleTriggerType) return null

    const locatedTrigger = pageTriggers.find(
      (trigger) => trigger.invocation === currentlyVisibleTriggerType
    )

    if (!locatedTrigger) return null

    // by default, invoke the behaviour from the trigger

    // if the trigger is passed from the API, it will have the behaviour instead.
    // in which case, we need to get the invoker from the clientHandlers map.
    const isApiControlledTrigger = 'behaviour' in locatedTrigger

    if (isApiControlledTrigger) return invokeAPITrigger(locatedTrigger)

    return invokeCustomTrigger(locatedTrigger)
  }, [currentlyVisibleTriggerType, pageTriggers, handlers])

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return
    if (!shouldLaunchIdleTriggers) return

    log('CollectorProvider: attempting to fire idle trigger')
    setCurrentlyVisibleTriggerType('INVOCATION_IDLE_TIME')
  }, [idleTriggers, log, shouldLaunchIdleTriggers])

  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger')
    setCurrentlyVisibleTriggerType('INVOCATION_EXIT_INTENT')
  }, [log])

  useEffect(() => {
    if (!exitIntentTriggers) return

    log('CollectorProvider: attempting to register exit trigger')

    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    })
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler])

  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')

    setCurrentlyVisibleTriggerType(undefined)
  }, [log])

  // @todo this should be invoked when booted
  // and then on any window page URL changes.
  // THIS FETCHES OUR CONFIG. DO NOT REMOVE ED
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

      const params: any = new URLSearchParams(window.location.search)
        .toString()
        .split('&')
        .reduce((acc, cur) => {
          const [key, value] = cur.split('=')
          if (!key) return acc
          acc[key] = value
          return acc
        }, {})

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
          setIdleTimeout(config?.idleDelay || defaultIdleStatusDelay)

          addPageTriggers(
            payload?.pageTriggers?.filter(
              (trigger) =>
                trigger.invocation === 'INVOCATION_IDLE_TIME' ||
                trigger.invocation === 'INVOCATION_EXIT_INTENT'
            ) || []
          )

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
    handlers,
    config?.idleDelay,
    initialDelay,
    log,
    trackEvent,
    visitor
  ])

  const setTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)

      setPageTriggers([...pageTriggers, trigger])
      setCurrentlyVisibleTriggerType(trigger.invocation)
    },
    [log, pageTriggers]
  )

  const collectorContextVal = React.useMemo(
    () => ({
      resetDisplayTrigger,
      setTrigger,
      trackEvent
    }),
    [resetDisplayTrigger, setTrigger, trackEvent]
  )

  return (
    <IdleTimerProvider
      timeout={idleTimeout}
      onPresenceChange={(presence: PresenceType) => {
        log('presence changed', presence)
      }}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider value={collectorContextVal}>
        {children}
      </CollectorContext.Provider>
      <TriggerComponent />
    </IdleTimerProvider>
  )
}

export type CollectorContextInterface = {
  resetDisplayTrigger: () => void
  setTrigger: (trigger: Trigger) => void
  trackEvent: (event: string, properties?: any) => void
}

export const CollectorContext = createContext<CollectorContextInterface>({
  resetDisplayTrigger: () => {},
  setTrigger: () => {},
  trackEvent: () => {}
})
