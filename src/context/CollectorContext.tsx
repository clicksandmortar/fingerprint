import uniqueBy from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { clientHandlers } from '../client/handler'
import { CollectorResponse, Trigger } from '../client/types'
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
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<
    Trigger['invocation'] | undefined
  >(undefined)
  const [intently, setIntently] = useState<boolean>(false)

  const addPageTriggers = (triggers: Trigger[]) => {
    setPageTriggers((prev) => uniqueBy<Trigger>([...prev, ...triggers], 'id'))
  }

  log('CollectorProvider: user is on mobile?', isMobile)

  const shouldLaunchIdleTriggers = isMobile

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

  const TriggerComponent = React.useCallback(() => {
    if (!displayTrigger) return null

    let handler: Trigger | undefined

    // TODO: UNDO
    const trigger = pageTriggers.find((_trigger) => {
      const potentialTrigger = _trigger.invocation === displayTrigger

      const potentialHandler = [...handlers, ...clientHandlers]?.find(
        (handler) => handler.behaviour === _trigger.behaviour
      )

      handler = potentialHandler
      return potentialTrigger && potentialHandler
    })

    if (!trigger) {
      error(`No trigger found for displayTrigger`, displayTrigger)
      return null
    }

    log('CollectorProvider: attempting to show trigger', trigger, handler)

    if (!handler) {
      log('No handler found for trigger', trigger)
      return null
    }

    if (!handler.invoke) {
      log('No invoke method found for handler', handler)

      return null
    }

    if (!handler.invoke) {
      log('No invoke method found for handler', handler)

      return null
    }

    const potentialComponent = handler.invoke?.(trigger)

    if (potentialComponent && React.isValidElement(potentialComponent))
      return potentialComponent

    return null
  }, [displayTrigger, error, handlers, log, pageTriggers, handlers])

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return
    if (!shouldLaunchIdleTriggers) return

    log('CollectorProvider: attempting to fire idle trigger')
    setDisplayTrigger('INVOCATION_IDLE_TIME')
  }, [idleTriggers, log, shouldLaunchIdleTriggers])

  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger')
    setDisplayTrigger('INVOCATION_EXIT_INTENT')
  }, [log, exitIntentTriggers, setDisplayTrigger])

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
    setDisplayTrigger(undefined)
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
    handlers,
    initialDelay,
    log,
    trackEvent,
    visitor
  ])

  const setTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      addPageTriggers([trigger])
      setDisplayTrigger(trigger.invocation)
    },
    [log, pageTriggers, setDisplayTrigger, addPageTriggers]
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
