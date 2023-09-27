import React, { createContext, useCallback, useEffect, useState } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { Handler } from '../client/handler'
import { CollectorResponse, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import { useFingerprint } from '../hooks/useFingerprint'
import { useLogging } from './LoggingContext'
import { useVisitor } from './VisitorContext'
import { useMixpanel } from './MixpanelContext'

const idleStatusAfterMs = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
}

type DisplayTrigger = 'idle' | 'exit' | 'default'

export const CollectorProvider = ({
  children,
  handlers
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
    cookie: { key: '_cm_exit', daysToExpire: 7 }
  })
  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    idleStatusAfterMs
  )
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<
    DisplayTrigger | undefined
  >(undefined)

  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)

  const showTrigger = (displayTrigger: DisplayTrigger | undefined) => {
    if (!displayTrigger) {
      return null
    }

    // Check if the server has provided a trigger for:
    // - the type of trigger we want to display (idle, exit, default, etc.)
    // - the behaviour of the trigger we want to display (modal, youtube, inverse, etc.)
    const trigger = pageTriggers.find(
      (trigger) =>
        trigger.type === displayTrigger &&
        handlers?.find((handler) => handler.behaviour === trigger.behaviour)
    )

    log('CollectorProvider: available triggers include: ', pageTriggers)
    log(
      'CollectorProvider: attempting to show displayTrigger',
      displayTrigger,
      trigger
    )

    if (!trigger) {
      error('No trigger found for displayTrigger', displayTrigger)
      return null
    }

    log('CollectorProvider: available handlers include: ', handlers)
    log('CollectorProvider: trigger to match is: ', trigger)

    // Now grab the handler for the trigger (this could be optimised with a map)
    const handler = handlers?.find(
      (handler) => handler.behaviour === trigger.behaviour
    )

    log('CollectorProvider: attempting to show trigger', trigger, handler)

    if (!handler) {
      error('No handler found for trigger', trigger)
      return null
    }

    if (!handler.invoke) {
      error('No invoke method found for handler', handler)
      return null
    }

    trackEvent('trigger_displayed', {
      triggerId: trigger.id,
      triggerType: trigger.type,
      triggerBehaviour: trigger.behaviour
    })

    return handler.invoke(trigger)
  }

  // const fireDefaultTrigger = useCallback(() => {
  //   if (displayTrigger) return

  //   log('CollectorProvider: attempting to fire default trigger', displayTrigger)
  //   setDisplayTrigger('default')
  // }, [])

  const fireIdleTrigger = useCallback(() => {
    if (displayTrigger) return
    if (!idleTriggers) return

    log('CollectorProvider: attempting to fire idle trigger', displayTrigger)
    setDisplayTrigger('idle')
  }, [pageTriggers, displayTrigger])

  const fireExitTrigger = useCallback(() => {
    if (displayTrigger) return

    log('CollectorProvider: attempting to fire exit trigger', displayTrigger)
    setDisplayTrigger('exit')
  }, [])

  useEffect(() => {
    if (!exitIntentTriggers) return

    log(
      'CollectorProvider: attempting to register exit trigger',
      displayTrigger
    )

    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    })
  }, [])

  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')
    setDisplayTrigger(undefined)
  }, [])

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
        .then((response: CollectorResponse) => {
          log('Sent collector data, retrieved:', response)

          // Set IdleTimer
          // @todo turn this into the dynamic value
          setIdleTimeout(idleStatusAfterMs)

          setPageTriggers(response.pageTriggers)

          if (!response.intently) {
            // remove intently overlay here
            log('CollectorProvider: user is in Fingerprint cohort')
          } else {
            // show intently overlay here
            log('CollectorProvider: user is in Intently cohort')
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

  useEffect(() => {
    if (!timeoutId) return

    return () => clearTimeout(timeoutId)
  }, [timeoutId])

  const renderedTrigger = React.useMemo(() => {
    return showTrigger(displayTrigger)
  }, [showTrigger, displayTrigger])

  return (
    <IdleTimerProvider
      timeout={idleTimeout}
      onPresenceChange={(presence: PresenceType) => {
        if (presence.type === 'active') {
          // clear interval regardless a value is present or not.
          // @ts-ignore
          clearTimeout(timeoutId)
          setTimeoutId(null)
        }
        log('presence changed', presence)
      }}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider
        value={{
          resetDisplayTrigger
        }}
      >
        {children}
        {renderedTrigger}
      </CollectorContext.Provider>
    </IdleTimerProvider>
  )
}
export type CollectorContextInterface = {
  resetDisplayTrigger: () => void
}

export const CollectorContext = createContext<CollectorContextInterface>({
  resetDisplayTrigger: () => {}
})
