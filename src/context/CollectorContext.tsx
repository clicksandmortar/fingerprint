import uniqueBy from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
// import { isMobile } from 'react-device-detect' <= reminder where isMobile came from
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { CollectorResponse, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import { useFingerprint } from '../hooks/useFingerprint'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { hasVisitorIDInURL } from '../utils/visitor_id'
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

  const configIdleDelay = config?.idleDelay
  const { visitor, session } = useVisitor()
  const { canNextTriggerOccur, startCooldown, getRemainingCooldownMs } =
    useTriggerDelay(config?.triggerCooldown)
  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()

  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler, resetState: reRegisterExitIntent } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })

  /**
   * Recalculate the idle delay based on config / default val and cooldown.
   */
  const getIdleStatusDelay = React.useCallback((): number => {
    const idleDelay = configIdleDelay || defaultIdleStatusDelay

    const cooldownDelay = getRemainingCooldownMs()

    const delayAdjustedForCooldown = idleDelay + cooldownDelay

    log(
      `Setting idle delay at ${delayAdjustedForCooldown}ms (cooldown ${cooldownDelay}ms + config.delay ${idleDelay}ms)`
    )

    return delayAdjustedForCooldown
  }, [getRemainingCooldownMs, configIdleDelay])

  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    getIdleStatusDelay()
  )
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTrigger, setDisplayTrigger] = useState<
    Trigger['invocation'] | undefined
  >(undefined)
  const [intently, setIntently] = useState<boolean>(false)
  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )

  /**
   * add triggers to existing ones, keep unique to prevent multi-firing
   */
  const addPageTriggers = (triggers: Trigger[]) => {
    setPageTriggers((prev) =>
      uniqueBy<Trigger>([...prev, ...(triggers || [])], 'id')
    )
  }

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

  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger')
    setDisplayTrigger(undefined)
  }, [log])

  const TriggerComponent = React.useCallback(() => {
    if (!displayTrigger) return null

    let handler: Trigger | undefined

    // TODO: UNDO
    const trigger = pageTriggers.find((_trigger) => {
      const potentialTrigger = _trigger.invocation === displayTrigger

      const potentialHandler = handlers?.find(
        (handler) => handler.behaviour === _trigger.behaviour
      )

      handler = potentialHandler
      return potentialTrigger && potentialHandler
    })

    if (!trigger) {
      error(`No trigger found for displayTrigger`, displayTrigger)
      return null
    }

    log('CollectorProvider: available handlers include: ', handlers)
    log('CollectorProvider: trigger to match is: ', trigger)

    log('CollectorProvider: attempting to show trigger', trigger, handler)

    if (!handler) {
      log('No handler found for trigger', trigger)
      return null
    }

    if (!handler.invoke) {
      log('No invoke method found for handler', handler)
      return null
    }

    const potentialComponent = handler.invoke?.(trigger)
    if (potentialComponent && React.isValidElement(potentialComponent)) {
      return potentialComponent
    }

    return null
  }, [
    log,
    displayTrigger,
    pageTriggers,
    handlers,
    getRemainingCooldownMs,
    error,
    startCooldown,
    resetDisplayTrigger
  ])

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return

    /**
     * @Note Idle trigger doesnt need to worry about cooldown, since its timeout gets adjusted for
     * the diff elsewhere
     */
    log('CollectorProvider: attempting to fire idle trigger')
    setDisplayTrigger('INVOCATION_IDLE_TIME')
    startCooldown()
  }, [idleTriggers, log, setDisplayTrigger, startCooldown])

  const launchExitTrigger = React.useCallback(() => {
    if (!canNextTriggerOccur()) {
      log(
        `Tried to launch EXIT trigger, but can't because of cooldown, ${getRemainingCooldownMs()}ms remaining. 
        I will attempt again when the same signal occurs after this passes.`
      )

      log('Re-registering handler')
      reRegisterExitIntent()
      return
    }

    log('CollectorProvider: attempting to fire exit trigger')
    setDisplayTrigger('INVOCATION_EXIT_INTENT')
    startCooldown()
  }, [log, canNextTriggerOccur, getRemainingCooldownMs, reRegisterExitIntent])

  /**
   * Register exit intent triggers
   */
  useEffect(() => {
    if (!exitIntentTriggers) return

    log('CollectorProvider: attempting to register exit trigger')

    registerHandler({
      id: 'clientTrigger',
      handler: launchExitTrigger
    })
  }, [exitIntentTriggers, launchExitTrigger, log, registerHandler])

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
          setIdleTimeout(getIdleStatusDelay())

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
    getIdleStatusDelay,
    setIdleTimeout,
    log,
    trackEvent,
    visitor,
    session?.id
  ])

  const registerWatcher = React.useCallback(
    (configuredSelector: string, configuredSearch: string) => {
      const intervalId = setInterval(() => {
        const inputs = document.querySelectorAll(configuredSelector)

        let found = false
        inputs.forEach((element) => {
          if (
            configuredSearch === '' &&
            window.getComputedStyle(element).display !== 'none'
          ) {
            // This means we do not have specific text, so we're checking if the element does not have display=none
            found = true
          } else if (element.textContent === configuredSearch) {
            // inform the UI that the element is found
            found = true
          }
          if (found && !foundWatchers[configuredSelector]) {
            trackEvent('booking_complete', {})
            foundWatchers[configuredSelector] = true
            setFoundWatchers(foundWatchers)
            collect({
              appId,
              visitor,
              sessionId: session?.id,
              elements: [
                {
                  path: window.location.pathname,
                  selector: configuredSelector
                }
              ]
            })
              .then(async (response: Response) => {
                const payload: CollectorResponse = await response.json()

                log('Sent collector data, retrieved:', payload)

                // Set IdleTimer
                // @todo turn this into the dynamic value
                setIdleTimeout(getIdleStatusDelay())

                addPageTriggers(payload?.pageTriggers)
              })
              .catch((err) => {
                error('failed to store collected data', err)
              })
            // unregister the watcher when the element is found
            clearInterval(intervalId)
          }
        })
      }, 500)

      return intervalId
    },
    [
      appId,
      collect,
      error,
      foundWatchers,
      getIdleStatusDelay,
      log,
      session,
      setIdleTimeout,
      trackEvent,
      visitor
    ]
  )

  useEffect(() => {
    if (!visitor.id) return
    const intervalIds = [registerWatcher('.stage-5', '')]

    // Cleanup all the watchers
    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId))
    }
  }, [registerWatcher, visitor])

  const setTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      addPageTriggers([trigger])
      setDisplayTrigger(trigger.invocation)
    },
    [log, setDisplayTrigger, addPageTriggers]
  )

  const collectorContextVal = React.useMemo(
    () => ({
      addPageTriggers,
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
  addPageTriggers: (triggers: Trigger[]) => void
  resetDisplayTrigger: () => void
  setTrigger: (trigger: Trigger) => void
  trackEvent: (event: string, properties?: any) => void
}
export const CollectorContext = createContext<CollectorContextInterface>({
  addPageTriggers: () => {},
  resetDisplayTrigger: () => {},
  setTrigger: () => {},
  trackEvent: () => {}
})
