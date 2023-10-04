import React, { createContext, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { Handler } from '../client/handler'
import { CollectorResponse, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import { useFingerprint } from '../hooks/useFingerprint'
import { useLogging } from './LoggingContext'
import { useMixpanel } from './MixpanelContext'
import { useVisitor } from './VisitorContext'

const defaultIdleStatusDelay = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
  idleDelay?: number
}

type DisplayTriggerType =
  | 'INVOCATION_UNSPECIFIED'
  | 'INVOCATION_IDLE_TIME'
  | 'INVOCATION_EXIT_INTENT'
  | 'INVOCATION_PAGE_LOAD'

export const CollectorProvider = ({
  children,
  handlers,
  idleDelay = defaultIdleStatusDelay
}: CollectorProviderProps) => {
  const { log, error } = useLogging()
  const { appId, booted, initialDelay, exitIntentTriggers, idleTriggers } =
    useFingerprint()
  const { visitor } = useVisitor()
  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()
  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })
  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(idleDelay)
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [currentlyVisibleTriggerType, setCurrentlyVisibleTriggerType] =
    useState<DisplayTriggerType | undefined>(undefined)
  const [intently, setIntently] = useState<boolean>(false)

  log('CollectorProvider: user is on mobile?', isMobile)

  // Removes the intently overlay, if intently is false
  useEffect(() => {
    if (intently) return

    log('CollectorProvider: removing intently overlay')

    const runningInterval = setInterval(function () {
      var children = document.querySelectorAll('div[id^=smc-v5-overlay-]')
      Array.prototype.forEach.call(children, function (node: any) {
        node.parentNode.removeChild(node)

        log('CollectorProvider: successfully removed intently overlay')

        clearInterval(runningInterval)
      })
    }, 100)

    return () => {
      clearInterval(runningInterval)
    }
  }, [intently])

  const trigger = React.useMemo(() => {
    if (!currentlyVisibleTriggerType) return null

    const locatedTrigger = pageTriggers.find(
      (trigger) =>
        trigger.invocation === currentlyVisibleTriggerType &&
        handlers?.find((handler) => handler.behaviour === trigger.behaviour)
    )
    if (!locatedTrigger) return null
    if (!handlers?.length) return null

    return locatedTrigger
  }, [pageTriggers, currentlyVisibleTriggerType, handlers])

  const handler = React.useMemo(() => {
    if (!trigger) return null

    return (
      handlers?.find((handler) => handler.behaviour === trigger.behaviour) ||
      null
    )
  }, [handlers, trigger])

  const TriggerComponent = React.useCallback(() => {
    if (!trigger) return null
    if (!handler?.invoke) return null

    const component = handler.invoke(trigger)

    return component || null
  }, [trigger, handler])

  // const fireDefaultTrigger = useCallback(() => {
  //   if (displayTrigger) return

  //   log('CollectorProvider: attempting to fire default trigger', displayTrigger)
  //   setDisplayTrigger('default')
  // }, [])

  const fireIdleTrigger = useCallback(() => {
    if (currentlyVisibleTriggerType) return
    if (!idleTriggers) return

    log('CollectorProvider: attempting to fire idle trigger')
    setCurrentlyVisibleTriggerType('INVOCATION_IDLE_TIME')
  }, [pageTriggers, currentlyVisibleTriggerType])

  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger')
    setCurrentlyVisibleTriggerType('INVOCATION_EXIT_INTENT')
  }, [])

  useEffect(() => {
    if (!exitIntentTriggers) return
    if (isMobile) return

    log('CollectorProvider: attempting to register exit trigger')

    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    })
  }, [])

  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')

    setCurrentlyVisibleTriggerType(undefined)
  }, [])

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
          setIdleTimeout(idleDelay)

          setPageTriggers(
            payload?.pageTriggers?.filter(
              (trigger) =>
                (isMobile && trigger.invocation === 'INVOCATION_IDLE_TIME') ||
                (!isMobile && trigger.invocation === 'INVOCATION_EXIT_INTENT')
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
  }, [booted, visitor])

  const setTrigger = (trigger: Trigger) => {
    log('CollectorProvider: manually setting trigger', trigger)

    setPageTriggers([...pageTriggers, trigger])
    setCurrentlyVisibleTriggerType(trigger.invocation)
  }

  return (
    <IdleTimerProvider
      timeout={idleTimeout}
      onPresenceChange={(presence: PresenceType) => {
        log('presence changed', presence)
      }}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider
        value={{
          resetDisplayTrigger,
          setTrigger,
          trackEvent
        }}
      >
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
