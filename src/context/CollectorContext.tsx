import uniqueBy from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
// import { isMobile } from 'react-device-detect' <= reminder where isMobile came from
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { CollectorVisitorResponse, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useFingerprint } from '../hooks/useFingerprint'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { getPagePayload, getReferrer } from '../utils/page'
import { hasVisitorIDInURL } from '../utils/visitor_id'
import { useLogging } from './LoggingContext'
import { useMixpanel } from './MixpanelContext'
import { useVisitor } from './VisitorContext'

const defaultIdleStatusDelay = 5 * 1000

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Trigger[]
}

// @TODO: Colleector only handles one trigger at a time currently.
// Therefore, a banner gets hidden as soon as an idle intent pops out, for example.
// We need to either:
// - add support for multiple active triggers and then simplify
// - prevent firing the next trigger even if the signal is correct, until the active one is dismissed (which is
// problematic as CollectorContext is not available in the Trigger component)
// eslint-disable-next-line require-jsdoc
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
    pageLoadTriggers,
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
  }, [configIdleDelay, getRemainingCooldownMs, log])

  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    getIdleStatusDelay()
  )
  const [pageTriggers, setPageTriggers] = useState<Trigger[]>([])
  const [displayTriggers, setDisplayedTriggers] = useState<string[]>([])
  const [intently, setIntently] = useState<boolean>(false)
  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )

  /**
   * add triggers to existing ones, keep unique to prevent multi-firing
   */
  const addPageTriggers = React.useCallback(
    (triggers: Trigger[]) => {
      setPageTriggers((prev) =>
        uniqueBy<Trigger>([...prev, ...(triggers || [])], 'id')
      )
    },
    [setPageTriggers]
  )

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

  const getHandlerForTrigger = React.useCallback(
    (_trigger: Trigger) => {
      const potentialHandler = handlers?.find(
        (handler) => handler.behaviour === _trigger.behaviour
      )
      if (!potentialHandler) return null

      return potentialHandler
    },
    [handlers]
  )

  const removeActiveTrigger = useCallback(
    (id: Trigger['id']) => {
      log(`CollectorProvider: removing id:${id} from displayTriggers`)
      const refreshedTriggers = displayTriggers.filter(
        (triggerId) => triggerId !== id
      )

      setDisplayedTriggers(refreshedTriggers)
    },
    [displayTriggers, log]
  )

  const TriggerComponent = React.useCallback(():
    | (JSX.Element | null)[]
    | null => {
    if (!displayTriggers) return null

    // TODO: UNDO
    const activeTriggers = pageTriggers.filter((trigger) =>
      displayTriggers.includes(trigger.id)
    )

    if (!activeTriggers) {
      error(`No trigger found for displayTriggers`, displayTriggers)
      return null
    }

    log('CollectorProvider: available handlers include: ', handlers)
    log('CollectorProvider: activeTriggers to match are: ', activeTriggers)

    log('CollectorProvider: attempting to show trigger', activeTriggers)

    return activeTriggers.map((trigger) => {
      const handler = getHandlerForTrigger(trigger)

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
        log(
          'CollectorProvider: Potential component for trigger is valid. Mounting'
        )
        return potentialComponent
      }

      log(
        'CollectorProvider: Potential component for trigger invalid. Running as regular func.'
      )

      return null
    })
  }, [
    displayTriggers,
    pageTriggers,
    log,
    handlers,
    error,
    getHandlerForTrigger
  ])

  const setDisplayedTriggerByInvocation = React.useCallback(
    (invocation: Trigger['invocation']) => {
      const invokableTrigger = pageTriggers.find(
        (trigger) => trigger.invocation === invocation
      )

      if (invokableTrigger)
        setDisplayedTriggers((ts) => [...ts, invokableTrigger.id])
    },
    [pageTriggers, setDisplayedTriggers]
  )

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return
    // if (displayTriggers) return

    /**
     * @Note Idle trigger doesnt need to worry about cooldown, since its timeout gets adjusted for
     * the diff elsewhere
     */
    log('CollectorProvider: attempting to fire idle time trigger')
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME')
    startCooldown()
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown])

  const { hasDelayPassed } = useExitIntentDelay(config?.exitIntentDelay)

  const fireExitTrigger = React.useCallback(() => {
    if (displayTriggers?.length) return

    if (!hasDelayPassed) {
      log(
        `Unable to launch exit intent, because of the exit intent delay hasn't passed yet.`
      )
      log('Re-registering handler')
      reRegisterExitIntent()
      return
    }

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
    setDisplayedTriggerByInvocation('INVOCATION_EXIT_INTENT')
    startCooldown()
  }, [
    displayTriggers?.length,
    hasDelayPassed,
    canNextTriggerOccur,
    log,
    setDisplayedTriggerByInvocation,
    startCooldown,
    reRegisterExitIntent,
    getRemainingCooldownMs
  ])

  /**
   * Register exit intent triggers
   */
  useEffect(() => {
    if (!exitIntentTriggers) return

    log('CollectorProvider: attempting to register exit trigger')

    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    })
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler])

  const fireOnLoadTriggers = useCallback(() => {
    if (!pageLoadTriggers) return
    if (!pageTriggers?.length) return

    /**
     * @Note Idle trigger doesnt need to worry about cooldown, since its timeout gets adjusted for
     * the diff elsewhere
     */
    log('CollectorProvider: attempting to fire on-page-load trigger')
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD')
  }, [pageLoadTriggers, log, setDisplayedTriggerByInvocation])

  const visitorId = visitor.id
  console.log('re-rung, checking,', { visitor })

  const run = useCallback(() => {
    if (!visitorId) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID')
      return
    }

    log('CollectorProvider: collecting data')

    if (hasVisitorIDInURL()) {
      trackEvent('abandoned_journey_landing', {
        from_email: true
      })
    }

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
          const payload: CollectorVisitorResponse = await response.json()

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
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    })
      .then(async (response: Response) => {
        if (response.status === 204) {
          setIntently(true)
          return
        }

        const payload: CollectorVisitorResponse = await response.json()

        log('Sent collector data, retrieved:', payload)

        // Set IdleTimer
        // @todo turn this into the dynamic value
        setIdleTimeout(getIdleStatusDelay())

        addPageTriggers(payload?.pageTriggers)

        // const cohort = payload.intently ? 'intently' : 'fingerprint'

        // setVisitor({ cohort })

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
  }, [
    visitorId,
    log,
    collect,
    appId,
    visitor,
    session?.id,
    trackEvent,
    error,
    getIdleStatusDelay,
    addPageTriggers
    // setVisitor
  ])

  // @todo this should be invoked when booted
  // and then on any window page URL changes.
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot')
      return
    }

    const delay = setTimeout(() => {
      console.log('SETTTTTTT')
      run()
    }, initialDelay)

    return () => {
      clearTimeout(delay)
    }
  }, [run, booted, initialDelay, log])

  // useEffect(() => {
  //   // refreshURL()
  //   console.log('re-rung, recalc..', history.length, window.location.href)
  //   // const currentPath = JSON.stringify(window.location.href)
  //   // console.log('RE-RUNG', currentPath)

  //   // run()
  // }, [run, window, history])

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
                const payload: CollectorVisitorResponse = await response.json()

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
    if (!visitorId) return
    const intervalIds = [registerWatcher('.stage-5', '')]

    // Cleanup all the watchers
    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId))
    }
  }, [registerWatcher, visitorId])

  const setActiveTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      addPageTriggers([trigger])
      setDisplayedTriggerByInvocation(trigger.invocation)
    },
    [log, setDisplayedTriggerByInvocation, addPageTriggers]
  )

  const collectorContextVal = React.useMemo(
    () => ({
      addPageTriggers,
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      trackEvent
    }),
    [addPageTriggers, removeActiveTrigger, setActiveTrigger, trackEvent]
  )

  useEffect(() => {
    fireOnLoadTriggers()
  }, [fireOnLoadTriggers])

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
        {/* @ts-ignore */}
        <TriggerComponent />
      </CollectorContext.Provider>
      {/* @TODO: this component has no access to any collector related stuff. Deal with this ASAP */}
    </IdleTimerProvider>
  )
}

export type CollectorContextInterface = {
  addPageTriggers: (triggers: Trigger[]) => void
  setPageTriggers: (triggers: Trigger[]) => void
  removeActiveTrigger: (id: Trigger['id']) => void
  setActiveTrigger: (trigger: Trigger) => void
  trackEvent: (event: string, properties?: any) => void
}

export const CollectorContext = createContext<CollectorContextInterface>({
  addPageTriggers: () => {
    console.error('addPageTriggers not implemented correctly')
  },
  setPageTriggers: () => {
    console.error('setPageTriggers not implemented correctly')
  },
  removeActiveTrigger: () => {
    console.error('removeActiveTrigger not implemented correctly')
  },
  setActiveTrigger: () => {
    console.error('setActiveTrigger not implemented correctly')
  },
  trackEvent: () => {
    console.error('trackEvent not implemented correctly')
  }
})
