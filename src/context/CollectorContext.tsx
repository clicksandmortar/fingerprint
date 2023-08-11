import React, { createContext, useEffect, useState } from 'react'
import { useCollector } from '../hooks/useCollector'
import { useLogging } from './LoggingContext'
import { Handler } from './FingerprintContext'
import { useVisitor } from './VisitorContext'
import { Trigger } from '../client/types'
import { useFingerprint } from '../hooks/useFingerprint'
import { useExitIntent } from 'use-exit-intent'
import { IdleTimerProvider } from 'react-idle-timer'
import { getBrand } from '../client/handler'

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

  const showTrigger = (trigger: Trigger) => {
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

    if (!handler.invoke) {
      error('No invoke method found for handler', handler)
      return null
    }

    return handler.invoke(trigger)
  }

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

    return () => clearTimeout(delay)
  }, [booted])

  return (
    <IdleTimerProvider
      timeout={1000 * 5}
      onPresenceChange={(presence: any) => log('presence changed', presence)}
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
        {showTrigger(trigger)}
      </CollectorContext.Provider>
    </IdleTimerProvider>
  )
}
export type CollectorContextInterface = {}

export const CollectorContext = createContext<CollectorContextInterface>({})
