import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import { useLogging } from './LoggingContext'
import { useVisitor } from './VisitorContext'
import { CollectorResponse, Trigger } from '../client/types'
import { useFingerprint } from '../hooks/useFingerprint'
import { useExitIntent } from 'use-exit-intent'
import { IdleTimerProvider } from 'react-idle-timer'
import { Handler, getBrand } from '../client/handler'
import { useMixpanel } from './MixpanelContext'
import { getCookie, setCookie } from '../utils/cookies'

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
  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(undefined)
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<
    DisplayTrigger | undefined
  >(undefined)

  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')
    setDisplayTrigger(undefined)
  }, [])

  // This method is called whenever we want to display a type of trigger
  // It will check if the server has provided a trigger for the provided display type.
  // For example, if we want to display an idle trigger, it will check if the server
  // has provided a configured idle trigger for the current page.
  //
  // If the server has provided a trigger, it will then check if the client side
  // has a handler for the trigger. If it does, it will invoke the handler.
  //
  // The handler invoke method (typically) results in a React component being rendered.
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

    // @todo remove when we remove use-exit-intent plugin for our own implementation
    // this is a hack as we can't use unsubscribe() due to a circular re-render
    if (displayTrigger === 'exit') {
      log(
        'CollectorProvider: displayed exit intent, unsubscribing from exit intent for 7 days'
      )

      setCookie('_cm_exit', 'true', 7)
    }

    // @todo this is temporary, this logic should all be server-side
    if (displayTrigger === 'idle') {
      log(
        'CollectorProvider: displayed idle intent, unsubscribing from exit intent for 1 days'
      )

      setCookie('_cm_idle', 'true', 1)
    }

    return handler.invoke(trigger)
  }

  const fireDefaultTrigger = useCallback(() => {
    if (displayTrigger) return

    log('CollectorProvider: attempting to fire default trigger', displayTrigger)
    setDisplayTrigger('default')
  }, [])

  const fireIdleTrigger = useCallback(() => {
    if (displayTrigger) return
    if (!idleTriggers) return
    if (getCookie('_cm_idle')) return

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

  console.warn('displayTrigger', displayTrigger)

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
        .then((response: CollectorResponse) => {
          log('Sent collector data, retrieved:', response)

          // Set IdleTimer
          // @todo turn this into the dynamic value
          setIdleTimeout(3 * 1000)

          // if (response.pageTriggers) {
          //   log(
          //     'CollectorProvider: received page triggers',
          //     response.pageTriggers
          //   )

          // setPageTriggers(response.pageTriggers)
          // @todo this is a hardcoded hack
          setPageTriggers([
            {
              id: 'welcome_modal',
              type: 'default',
              behaviour: 'modal',
              data: {
                text: 'Hey, welcome to the site?',
                message:
                  "We'd love to welcome to you to our restaurant, book now to get your offer!",
                button: 'Start Booking'
              },
              brand: getBrand(window.location.href)
            },
            {
              id: 'fb_ads_homepage',
              type: 'idle',
              behaviour: 'modal',
              data: {
                text: 'Are you still there?',
                message:
                  "Don't be idle, stay active and book now to get your offer!",
                button: 'Start Booking'
              },
              brand: getBrand(window.location.href)
            },
            {
              id: 'fb_ads_homepage',
              type: 'exit',
              behaviour: 'inverse_flow',
              data: {
                foo: 'this is an example for Ed',
                bar: 'is where aden is going to get his Negroni'
              },
              brand: getBrand(window.location.href)
            }
          ])
          // }

          // @todo we should register the idle triggers here

          // @todo Register default trigger, don't just fire it.
          // That way we can defer the firing until a server configured delay.
          fireDefaultTrigger()
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })

      log('CollectorProvider: collected data')
    }, initialDelay)

    return () => clearTimeout(delay)
  }, [booted, visitor])

  // @todo would like to remove IdleTimer for our own, but unlike Exit Intent, the
  // Idle Timer we are using actually works nicely and is reactive to state changes.
  return (
    <IdleTimerProvider
      timeout={idleTimeout}
      onPresenceChange={(presence: any) => log('presence changed', presence)}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider
        value={{
          resetDisplayTrigger
        }}
      >
        {children}
        {showTrigger(displayTrigger)}
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
