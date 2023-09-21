import React, { createContext, useEffect, useState } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { getBrand } from '../client/handler'
import { Trigger } from '../client/types'
import { useCollector } from '../hooks/useCollector'
import { useFingerprint } from '../hooks/useFingerprint'
import { Handler } from './FingerprintContext'
import { useLogging } from './LoggingContext'
import { useVisitor } from './VisitorContext'

const idleStatusAfterMs = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
}

export const CollectorProvider = ({
  children,
  handlers
}: CollectorProviderProps) => {
  const { log, error } = useLogging()
  const { appId, booted, initialDelay, exitIntentTriggers, idleTriggers } =
    useFingerprint()
  const { visitor } = useVisitor()
  const { mutateAsync: collect } = useCollector()
  const { registerHandler } = useExitIntent({
    cookie: { key: 'cm_exit', daysToExpire: 7 }
  })
  const [trigger, setTrigger] = useState<Trigger>({})

  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)

  const showTrigger = React.useCallback(
    (trigger: Trigger) => {
      if (!trigger || !trigger.behaviour) {
        return null
      }

      const handler =
        handlers?.find(
          (handler: Handler) =>
            handler.id === trigger.id && handler.behaviour === trigger.behaviour
        ) ||
        handlers?.find(
          (handler: Handler) => handler.behaviour === trigger.behaviour
        )

      log('CollectorProvider: showTrigger', trigger, handler)

      if (!handler) {
        error('No handler found for trigger', trigger)
        return null
      }
      if (handler.skip) {
        log('Explicitly skipping trigger handler', trigger, handler)
        return
      }

      if (!handler.invoke) {
        error('No invoke method found for handler', handler)

        return null
      }

      if (handler.delay) {
        const tId = setTimeout(() => {
          return handler.invoke?.(trigger)
        }, handler.delay)

        setTimeoutId(tId)

        return null
      }

      return handler.invoke(trigger)
    },
    [setTimeoutId, log, handlers]
  )

  useEffect(() => {
    if (!exitIntentTriggers) return

    registerHandler({
      id: 'clientTriger',
      handler: () => {
        log('CollectorProvider: handler invoked for departure')
        setTrigger({
          id: 'exit_intent',
          behaviour: 'modal',
          data: {
            text: 'Before you go...',
            message:
              "Don't leave, there's still time to complete a booking now to get your offer",
            button: 'Start Booking'
          },
          brand: getBrand(window.location.href)
        })
      }
    })
  }, [exitIntentTriggers])

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
          title: document.referrer,
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
        .then((response) => {
          log('Sent collector data, retrieved:', response)
          if (response.trigger) {
            setTrigger(response.trigger)
          }
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })

      log('CollectorProvider: collected data')
      log('This will run after 1 second!')
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
    return showTrigger(trigger)
  }, [showTrigger, trigger])

  return (
    <IdleTimerProvider
      timeout={idleStatusAfterMs}
      onPresenceChange={(presence: PresenceType) => {
        if (presence.type === 'active') {
          // clear interval regardless a value is present or not.
          // @ts-ignore
          clearTimeout(timeoutId)
          setTimeoutId(null)
        }
        log('presence changed', presence)
      }}
      onIdle={() => {
        if (!idleTriggers) return

        log('CollectorProvider: handler invoked for presence')
        setTrigger({
          id: 'fb_ads_homepage',
          behaviour: 'modal',
          data: {
            text: 'Are you still there?',
            message:
              "We'd love to welcome to you to our restaurant, book now to get your offer",
            button: 'Start Booking'
          },
          brand: getBrand(window.location.href)
        })
      }}
    >
      <CollectorContext.Provider value={{}}>
        {children}
        {renderedTrigger}
      </CollectorContext.Provider>
    </IdleTimerProvider>
  )
}
export type CollectorContextInterface = {}

export const CollectorContext = createContext<CollectorContextInterface>({})
