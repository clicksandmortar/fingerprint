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
import { isMobile } from 'react-device-detect'

const idleStatusAfterMs = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
}

type DisplayTrigger =
  | 'INVOCATION_UNSPECIFIED'
  | 'INVOCATION_IDLE_TIME'
  | 'INVOCATION_EXIT_INTENT'
  | 'INVOCATION_PAGE_LOAD'

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
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })
  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    idleStatusAfterMs
  )
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<
    DisplayTrigger | undefined
  >(undefined)
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null)
  const [intently, setIntently] = useState<boolean>(false)

  console.log('current pageTrigger', pageTriggers)

  log('CollectorProvider: user is on mobile?', isMobile)

  // Removes the intently overlay, if intently is false
  useEffect(() => {
    if (intently) return

    log('CollectorProvider: removing intently overlay')

    const runningInterval = setInterval(function () {
      var children = document.querySelectorAll('div[id=smc-v5-overlay-106412]')
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

  const showTrigger = (displayTrigger: DisplayTrigger | undefined) => {
    if (!displayTrigger) {
      return null
    }

    // Check if the server has provided a trigger for:
    // - the type of trigger we want to display (idle, exit, default, etc.)
    // - the behaviour of the trigger we want to display (modal, youtube, inverse, etc.)
    const trigger = pageTriggers.find(
      (trigger) =>
        trigger.invocation === displayTrigger &&
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
      triggerType: trigger.invocation,
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

    log('CollectorProvider: attempting to fire idle trigger')
    setDisplayTrigger('INVOCATION_IDLE_TIME')
  }, [pageTriggers, displayTrigger])

  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger')
    setDisplayTrigger('INVOCATION_EXIT_INTENT')
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
        .then(async (response: Response) => {
          const payload: CollectorResponse = await response.json()

          log('Sent collector data, retrieved:', payload)

          // Set IdleTimer
          // @todo turn this into the dynamic value
          setIdleTimeout(idleStatusAfterMs)

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
          } else {
            // show intently overlay here
            log('CollectorProvider: user is in Intently cohort')
            setIntently(true)
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

  const setTrigger = useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      setPageTriggers([...pageTriggers, trigger])
      setDisplayTrigger(trigger.invocation)
    },
    [pageTriggers]
  )

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
          resetDisplayTrigger,
          setTrigger
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
  setTrigger: (trigger: Trigger) => void
}

export const CollectorContext = createContext<CollectorContextInterface>({
  resetDisplayTrigger: () => {},
  setTrigger: () => {}
})
