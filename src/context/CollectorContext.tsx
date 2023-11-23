import uniqueBy from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
// import { isMobile } from 'react-device-detect' <= reminder where isMobile came from
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'

import {
  CollectorVisitorResponse,
  IncompleteTrigger,
  Trigger
} from '../client/types'
import { useCollinsBookingComplete } from '../hooks/mab/useCollinsBookingComplete'
import useButtonCollector from '../hooks/useButtonCollector'
import { useCollectorMutation } from '../hooks/useCollectorMutation'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useFingerprint } from '../hooks/useFingerprint'
import useFormCollector from '../hooks/useFormCollector'
import useIncompleteTriggers from '../hooks/useIncompleteTriggers'
import useIntently from '../hooks/useIntently'
import useRunOnPathChange from '../hooks/useRunOnPathChange'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { getPagePayload, getReferrer } from '../utils/page'
import { hasVisitorIDInURL } from '../utils/visitor_id'

import { useConfig } from '../hooks/useBrandConfig'
import { useLogging } from './LoggingContext'
import { useMixpanel } from './MixpanelContext'
import { useVisitor } from './VisitorContext'

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
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    pageLoadTriggers
  } = useFingerprint()
  const {
    setConfig,
    config: { trigger: config }
  } = useConfig()
  const { visitor, setVisitor } = useVisitor()
  const {
    canNextTriggerOccur,
    startCooldown,
    getRemainingCooldownMs,
    getIdleStatusDelay
  } = useTriggerDelay()
  const { trackEvent } = useMixpanel()
  const { mutateAsync: collect } = useCollectorMutation()
  const { checkCollinsBookingComplete } = useCollinsBookingComplete()

  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler, resetState: reRegisterExitIntent } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })

  const [idleTimeout, setIdleTimeout] = useState<number | undefined>(
    getIdleStatusDelay()
  )
  const [pageTriggers, setPageTriggersState] = useState<Trigger[]>([])

  const { setIntently } = useIntently()
  const [displayTriggers, setDisplayedTriggers] = useState<Trigger['id'][]>([])
  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )

  // Passing the funcs down to other contexts from here. So please keep it until Collector
  // is refactored
  const { setIncompleteTriggers, visibleTriggers: visibleIncompleteTriggers } =
    useIncompleteTriggers()

  const combinedTriggers = React.useMemo(
    () => [...pageTriggers, ...visibleIncompleteTriggers],
    [pageTriggers, visibleIncompleteTriggers]
  )

  const getIsBehaviourVisible = React.useCallback(
    (type: Trigger['behaviour']) => {
      if (displayTriggers.length === 0) return false
      if (
        displayTriggers.find(
          (triggerId) =>
            pageTriggers.find((trigger) => trigger.id === triggerId)
              ?.behaviour === type
        )
      )
        return true

      return false
    },
    [displayTriggers, pageTriggers]
  )

  const setDisplayedTriggerByInvocation = React.useCallback(
    (
      invocation: Trigger['invocation'],
      shouldAllowMultipleSimultaneous = false
    ) => {
      const invokableTrigger = combinedTriggers.find(
        (trigger) => trigger.invocation === invocation
      )

      if (!invokableTrigger) {
        log('CollectorProvider: Trigger not invokable ', invokableTrigger)
        return
      }

      if (
        !shouldAllowMultipleSimultaneous &&
        getIsBehaviourVisible(invokableTrigger.behaviour)
      ) {
        log(
          'CollectorProvider: Behaviour already visible, not showing trigger',
          invokableTrigger
        )
        return
      }

      // if the trigger is already in the list, don't add it again
      setDisplayedTriggers((prev) => {
        if (prev.includes(invokableTrigger.id)) return prev

        return [...prev, invokableTrigger.id]
      })
    },
    [combinedTriggers, getIsBehaviourVisible, log]
  )
  useEffect(() => {
    if (!visibleIncompleteTriggers?.length) return

    // TODO: eventually we may want support for multiple signals so this
    // will need to be refactored / reworked
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE')
  }, [
    visibleIncompleteTriggers,
    setPageTriggersState,
    setDisplayedTriggerByInvocation
  ])
  /**
   * add triggers to existing ones, keep unique to prevent multi-firing
   */
  const setPageTriggers = React.useCallback(
    (triggers: Trigger[]) => {
      setPageTriggersState((prev) => {
        const nonDismissed = prev.filter((tr) =>
          displayTriggers.includes(tr.id)
        )
        // no pageTriggers = no triggers, rather than missing key.
        // serverside omition. Means we set pagetriggers to nothing.
        return uniqueBy<Trigger>([...(triggers || []), ...nonDismissed], 'id')
      })
    },
    [setPageTriggersState, displayTriggers]
  )

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
      setIncompleteTriggers((prev) =>
        prev.filter((trigger) => trigger.id !== id)
      )
      setPageTriggersState((prev) =>
        prev.filter((trigger) => trigger.id !== id)
      )
    },
    [displayTriggers, log, setIncompleteTriggers]
  )

  const TriggerComponent = React.useCallback(():
    | (JSX.Element | null)[]
    | null => {
    if (!displayTriggers) return null

    // TODO: UNDO
    const activeTriggers = combinedTriggers.filter((trigger) =>
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
    log,
    handlers,
    error,
    getHandlerForTrigger,
    combinedTriggers
  ])

  useEffect(() => {
    if (!visibleIncompleteTriggers?.length) return

    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE')
  }, [setDisplayedTriggerByInvocation, visibleIncompleteTriggers])

  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return

    /**
     * @Note Idle trigger doesnt need to worry about cooldown, since its timeout gets adjusted for
     * the diff elsewhere
     */
    log('CollectorProvider: attempting to fire idle time trigger')
    setDisplayedTriggerByInvocation('INVOCATION_IDLE_TIME')
    startCooldown()
  }, [idleTriggers, log, setDisplayedTriggerByInvocation, startCooldown])

  const { hasDelayPassed } = useExitIntentDelay(
    config?.displayTriggerAfterSecs * 1000
  )

  const fireExitTrigger = React.useCallback(() => {
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
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true)
  }, [pageLoadTriggers, pageTriggers, log, setDisplayedTriggerByInvocation])

  // TODO: merge this and /seen callback into one thing when we no longer require
  // setting intently - thats the only differentiator between the callbacks
  const collectorCallback = React.useCallback(
    async (response: Response) => {
      const payload: CollectorVisitorResponse = await response.json()

      log('Sent collector data, retrieved:', payload)

      // Set IdleTimer
      // @todo turn this into the dynamic value
      setIdleTimeout(getIdleStatusDelay())
      setPageTriggers(payload?.pageTriggers)
      setConfig(payload.config)
      setIncompleteTriggers(payload?.incompleteTriggers || [])

      const cohort = payload.intently ? 'intently' : 'fingerprint'
      if (visitor.cohort !== cohort) setVisitor({ cohort })

      log('CollectorProvider: collected data')
      if (!payload.intently) {
        // remove intently overlay here
        log('CollectorProvider: user is in Fingerprint cohort')
        setIntently(false)
      } else {
        // show intently overlay here
        log('CollectorProvider: user is in Intently cohort')
        setIntently(true)
      }
    },
    [
      log,
      getIdleStatusDelay,
      setPageTriggers,
      setConfig,
      setIncompleteTriggers,
      visitor.cohort,
      setVisitor,
      setIntently
    ]
  )

  const collectAndApplyVisitorInfo = React.useCallback(() => {
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
        account: {
          token: hashParams.id_token
        }
      })
        .then(async (response: Response) => {
          collectorCallback(response)
        })
        .catch((err) => {
          error('failed to store collected data', err)
        })
    }

    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    })
      .then(async (response: Response) => {
        if (response.status === 204) {
          setIntently(true)
          return
        }
        collectorCallback(response)
      })

      .catch((err) => {
        error('failed to store collected data', err)
      })
  }, [
    visitor.id,
    log,
    collect,
    trackEvent,
    error,
    collectorCallback,
    setIntently
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
              elements: [
                {
                  path: window.location.pathname,
                  selector: configuredSelector
                }
              ]
            })
              .then(collectorCallback)
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
    [collect, collectorCallback, error, foundWatchers, trackEvent]
  )

  useEffect(() => {
    if (!visitor.id) return
    const intervalIds = [registerWatcher('.stage-5', '')]

    // Cleanup all the watchers
    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId))
    }
  }, [registerWatcher, visitor])

  const setActiveTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      setPageTriggers([trigger])
      setDisplayedTriggerByInvocation(trigger.invocation)
    },
    [log, setDisplayedTriggerByInvocation, setPageTriggers]
  )

  const collectorContextVal = React.useMemo(
    () => ({
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      setIncompleteTriggers,
      trackEvent
    }),
    [
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      trackEvent,
      setIncompleteTriggers
    ]
  )

  useEffect(() => {
    fireOnLoadTriggers()
  }, [fireOnLoadTriggers])

  // @TODO: this will be scrapped / reworked soon
  useRunOnPathChange(checkCollinsBookingComplete, {
    skip: !booted,
    delay: initialDelay
  })

  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay
  })

  useRunOnPathChange(fireOnLoadTriggers, {
    skip: !booted,
    delay: initialDelay
  })

  useFormCollector()
  useButtonCollector()

  const onPresenseChange = React.useCallback(
    (presence: PresenceType) => {
      log('presence changed', presence)
    },
    [log]
  )

  return (
    <IdleTimerProvider
      timeout={idleTimeout}
      onPresenceChange={onPresenseChange}
      onIdle={fireIdleTrigger}
    >
      <CollectorContext.Provider value={collectorContextVal}>
        {children}
        {TriggerComponent()}
      </CollectorContext.Provider>
      {/* @TODO: this component has no access to any collector related stuff. Deal with this ASAP */}
    </IdleTimerProvider>
  )
}

export type CollectorContextInterface = {
  setPageTriggers: (triggers: Trigger[]) => void
  setIncompleteTriggers: (triggers: IncompleteTrigger[]) => void
  removeActiveTrigger: (id: Trigger['id']) => void
  setActiveTrigger: (trigger: Trigger) => void
  // @NOTE: please keep it here. THis makes sure that context mixup doesn't
  // impact the usage of the tracking function
  trackEvent: (event: string, properties?: any) => void
}

export const CollectorContext = createContext<CollectorContextInterface>({
  setPageTriggers: () => {
    console.error('setPageTriggers not implemented correctly')
  },
  removeActiveTrigger: () => {
    console.error('removeActiveTrigger not implemented correctly')
  },
  setIncompleteTriggers: () => {
    console.error('setIncompleteTriggers not implemented correctly')
  },
  setActiveTrigger: () => {
    console.error('setActiveTrigger not implemented correctly')
  },
  trackEvent: () => {
    console.error('trackEvent not implemented correctly')
  }
})
