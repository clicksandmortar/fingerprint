import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useCollector } from '../hooks/useCollector'
import { useLogging } from './LoggingContext'
import { Handler } from './FingerprintContext'
import { useVisitor } from './VisitorContext'
import { Trigger } from '../client/types'
import { useFingerprint } from '../hooks/useFingerprint'
// import { useExitIntent } from 'use-exit-intent'
import { IdleTimerProvider } from 'react-idle-timer'
import { getBrand } from '../client/handler'

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
}

export const CollectorProvider = ({ children }: CollectorProviderProps) => {
  const { log, error } = useLogging()
  const { appId, booted, initialDelay, exitIntentTriggers, idleTriggers } =
    useFingerprint()
  const { visitor } = useVisitor()
  const { mutateAsync: collect } = useCollector()
  // const { registerHandler } = useExitIntent({
  //   cookie: { key: 'cm_exit', daysToExpire: 7 }
  // })
  const [pageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<Trigger | null>(null)

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return
    if (!displayTrigger) return

    // @todo update log line
    log('CollectorProvider: fireIdleTrigger: xxx')

    // Update this to loop through marry up handlers with pageTriggers
    // pageTriggers contains an array of triggers that can show on the page
    // with a maximum of one per type (types include 'idle', 'exit' and 'default')
    // Where a page trigger type for 'idle' exits, ensure a handler by 'behaviour'
    // also exists in handlers, and then set it to display here.
    setDisplayTrigger({
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
  }, [pageTriggers, displayTrigger])

  // const fireDefaultTrigger = useCallback(() => {
  //   log(
  //     'CollectorProvider: fireDefaultTrigger: not doing anything here at the moment, as we need more thought on how the server can decide _when_ a server informed trigger should fire — possibly the server could suggest after _x_ seconds'
  //   )

  //   //   if (!trigger || !trigger.behaviour) {
  //   //     return null
  //   //   }

  //   //   const handler =
  //   //     handlers?.find(
  //   //       (handler: Handler) =>
  //   //         handler.id === trigger.id && handler.behaviour === trigger.behaviour
  //   //     ) ||
  //   //     handlers?.find(
  //   //       (handler: Handler) => handler.behaviour === trigger.behaviour
  //   //     )

  //   //   log('CollectorProvider: showTrigger', trigger, handler)

  //   //   if (!handler) {
  //   //     error('No handler found for trigger', trigger)
  //   //     return null
  //   //   }

  //   //   if (!handler.invoke) {
  //   //     error('No invoke method found for handler', handler)
  //   //     return null
  //   //   }

  //   //   return handler.invoke(trigger)
  // }, [])

  useEffect(() => {
    if (!exitIntentTriggers) return
    // if (trigger) return

    // registerHandler({
    //   id: 'clientTriger',
    //   handler: () => {
    //     log('CollectorProvider: handler invoked for departure')
    //     // setTrigger({
    //     //   id: 'exit_intent',
    //     //   behaviour: 'inverse',
    //     //   data: {
    //     //     // text: 'Before you go...',
    //     //     // message:
    //     //     //   "Don't leave, there's still time to complete a booking now to get your offer",
    //     //     // button: 'Start Booking'
    //     //   },
    //     //   brand: getBrand(window.location.href)
    //     // })
    //   }
    // })
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
          url: 'https://example.com' || document.referrer,
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
            // setTrigger(response.trigger)
          }
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })

      log('CollectorProvider: collected data')
    }, initialDelay)

    return () => clearTimeout(delay)
  }, [booted, visitor])

  return (
    <IdleTimerProvider
      timeout={1000 * 5}
      onPresenceChange={(presence: any) => log('presence changed', presence)}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider value={{}}>
        {children}
        {/* {showTrigger(trigger)} */}
      </CollectorContext.Provider>
    </IdleTimerProvider>
  )
}
export type CollectorContextInterface = {}

export const CollectorContext = createContext<CollectorContextInterface>({})
