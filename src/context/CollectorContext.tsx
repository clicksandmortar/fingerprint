/* eslint-disable max-lines */
/* eslint-disable require-jsdoc */
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { useDifiStore, useEntireStore } from '../beautifulSugar/store'
import {
  CollectorVisitorResponse,
  Conversion,
  IncompleteTrigger,
  Trigger
} from '../client/types'
import { useCollectorMutation } from '../hooks/api/useCollectorMutation'
import { useCollinsBookingComplete } from '../hooks/mab/useCollinsBookingComplete'
import { useBrand } from '../hooks/useBrandConfig'
import useButtonCollector from '../hooks/useButtonCollector'
import useConversions from '../hooks/useConversions'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useFingerprint } from '../hooks/useFingerprint'
import useFormCollector from '../hooks/useFormCollector'
import useIncompleteTriggers from '../hooks/useIncompleteTriggers'
import useIntently from '../hooks/useIntently'
import { useLogging } from '../hooks/useLogging'
import useRunOnPathChange from '../hooks/useRunOnPathChange'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { getPagePayload, getReferrer } from '../utils/page'
import { hasVisitorIDInURL } from '../utils/visitor_id'
import { updateCookie } from '../visitors/bootstrap'
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
    initialDelay,
    exitIntentTriggers,
    idleTriggers,
    pageLoadTriggers,
    booted
  } = useFingerprint()
  const { config } = useEntireStore()

  const { visitor, setVisitor } = useVisitor()

  const {
    canNextTriggerOccur,
    startCooldown,
    getRemainingCooldownMs,
    getIdleStatusDelay
  } = useTriggerDelay()
  const {
    trackEvent,
    state: { initiated: mixpanelBooted }
  } = useMixpanel()
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

  const {
    removePageTrigger,
    pageTriggers,
    displayedTriggersIds,
    setPageTriggers,
    setDisplayedTriggers,
    set
  } = useEntireStore()

  const { setIntently } = useIntently()
  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )

  const { setConversions } = useConversions()
  const brand = useBrand()
  // Passing the funcs down to other contexts from here. So please keep it until Collector
  // is refactored
  const {
    setIncompleteTriggers,
    setVisibleTriggers,
    visibleTriggers: visibleIncompleteTriggers
  } = useIncompleteTriggers()

  const combinedTriggers = React.useMemo(() => {
    const _combinedTriggers = [...pageTriggers, ...visibleIncompleteTriggers]
    return _combinedTriggers
  }, [pageTriggers, visibleIncompleteTriggers])

  const getIsBehaviourVisible = React.useCallback(
    (type: Trigger['behaviour']) => {
      if (displayedTriggersIds.length === 0) return false

      if (
        displayedTriggersIds.find(
          (triggerId: Trigger['id']) =>
            combinedTriggers.find((trigger) => trigger.id === triggerId)
              ?.behaviour === type
        )
      )
        return true

      return false
    },
    [displayedTriggersIds, combinedTriggers]
  )

  const { appendTrigger } = useDifiStore((s) => s)

  const setDisplayedTriggerByInvocation = React.useCallback(
    (
      invocation: Trigger['invocation'],
      shouldAllowMultipleSimultaneous = false
    ) => {
      const invokableTriggers = combinedTriggers.filter(
        (trigger) => trigger.invocation === invocation
      )

      invokableTriggers.forEach((invokableTrigger) => {
        if (!invokableTrigger) {
          log('CollectorProvider: Trigger not invokable ', invokableTrigger)
          return
        }

        if (invokableTrigger.behaviour === 'BEHAVIOUR_BANNER') {
          // @TODO: special case for banners. we should probably defione this in the handler
          log(
            'Banners can be stacked up, setting as visible.',
            invokableTrigger
          )
          appendTrigger(invokableTrigger)
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

        log('CollectorProvider: Triggering behaviour', invokableTrigger)
        // if the trigger is already in the list, don't add it again
        appendTrigger(invokableTrigger)
      })
    },
    [combinedTriggers, getIsBehaviourVisible, log, appendTrigger]
  )

  useEffect(() => {
    if (!visibleIncompleteTriggers?.length) return

    // TODO: eventually we may want support for multiple signals so this
    // will need to be refactored / reworked
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE')
  }, [visibleIncompleteTriggers, setDisplayedTriggerByInvocation])

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

  // const { incompleteTriggers, } = useDifiStore()

  const removeActiveTrigger = useCallback(
    (id: Trigger['id']) => {
      log(`CollectorProvider: removing id:${id} from displayedTriggersIds`)

      const refreshedTriggers = displayedTriggersIds.filter(
        (triggerId: Trigger['id']) => triggerId !== id
      )

      setDisplayedTriggers(refreshedTriggers)
      setIncompleteTriggers((prev) =>
        prev.filter((trigger) => trigger.id !== id)
      )
      setVisibleTriggers((prev) => prev.filter((trigger) => trigger.id !== id))
      removePageTrigger(id)
    },
    [
      log,
      displayedTriggersIds,
      setDisplayedTriggers,
      setIncompleteTriggers,
      setVisibleTriggers,
      removePageTrigger
    ]
  )

  const TriggerComponent = React.useCallback(():
    | (JSX.Element | null)[]
    | null => {
    if (!displayedTriggersIds) return null

    // TODO: UNDO
    const activeTriggers = combinedTriggers.filter((trigger) =>
      displayedTriggersIds.includes(trigger.id)
    )

    if (!activeTriggers) {
      error(
        `CollectorProvider - TriggerComponent: No trigger found for displayedTriggersIds`,
        displayedTriggersIds
      )
      return null
    }

    log(
      'CollectorProvider - TriggerComponent: available handlers include: ',
      handlers
    )
    log(
      'CollectorProvider - TriggerComponent: activeTriggers to match are: ',
      activeTriggers
    )

    log(
      'CollectorProvider - TriggerComponent: attempting to show trigger',
      activeTriggers
    )

    return activeTriggers.map((trigger) => {
      const handler = getHandlerForTrigger(trigger)

      if (!handler) {
        log(
          'CollectorProvider - TriggerComponent: No handler found for trigger',
          trigger
        )
        return null
      }
      if (!handler.invoke) {
        log(
          'CollectorProvider - TriggerComponent: No invoke method found for handler',
          handler
        )
        return null
      }

      const isTriggerOfSameBehaviourAlreadyVisible = getIsBehaviourVisible(
        trigger.behaviour
      )

      if (
        // this check is only necessary because we run through multiple render cycles
        // when we place a component on the page
        !displayedTriggersIds.includes(trigger.id) &&
        // ---
        isTriggerOfSameBehaviourAlreadyVisible &&
        !handler.multipleOfSameBehaviourSupported
      ) {
        log(
          `CollectorProvider - TriggerComponent: Behaviour ${trigger.behaviour} (triggerId: ${trigger.id}) is already visible and does NOT support multiple triggers. Not showing.`,
          trigger.id
        )
        return null
      }

      const potentialComponent = handler.invoke?.(trigger)

      if (potentialComponent && React.isValidElement(potentialComponent)) {
        log(
          'CollectorProvider - TriggerComponent: Potential component for trigger is valid. Mounting'
        )
        return potentialComponent
      }

      log(
        'CollectorProvider: Potential component for trigger invalid. Running as regular func.'
      )

      return null
    })
  }, [
    displayedTriggersIds,
    log,
    handlers,
    error,
    getHandlerForTrigger,
    getIsBehaviourVisible,
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

  // TODO: unsafe chaining?
  const { hasDelayPassed } = useExitIntentDelay(
    config?.trigger.displayTriggerAfterSecs * 1000
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
    if (!combinedTriggers?.length) return

    /**
     * @Note Idle trigger doesnt need to worry about cooldown, since its timeout gets adjusted for
     * the diff elsewhere
     */
    log('CollectorProvider: attempting to fire on-page-load trigger')
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true)
  }, [pageLoadTriggers, combinedTriggers, log, setDisplayedTriggerByInvocation])

  const collectorCallback = React.useCallback(
    async (response: Response) => {
      const payload: CollectorVisitorResponse = await response.json()

      log('Sent collector data, retrieved:', payload)

      const retrievedUserId = payload.identifiers?.main

      if (retrievedUserId) {
        updateCookie(retrievedUserId)
        setVisitor({ id: retrievedUserId })
      }

      set(() => ({
        pageTriggers: payload?.pageTriggers || [],
        config: payload?.config
      }))
      // Set IdleTimer
      // @todo turn this into the dynamic value
      setIdleTimeout(getIdleStatusDelay())
      setIncompleteTriggers(payload?.incompleteTriggers || [])
      setConversions(payload?.conversions || [])
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
      set,
      getIdleStatusDelay,
      setIncompleteTriggers,
      setConversions,
      visitor,
      setVisitor,
      pageTriggers,
      setIntently
    ]
  )

  useEffect(() => {
    if (!mixpanelBooted) return

    if (hasVisitorIDInURL()) {
      log('CollectorProvider: visitor ID in URL, collecting data')
      trackEvent('abandoned_journey_landing', {
        from_email: true
      })
    }
  }, [trackEvent, log, mixpanelBooted])

  const collectAndApplyVisitorInfo = React.useCallback(() => {
    if (!visitor.id) {
      log('CollectorProvider: Not yet collecting, awaiting visitor ID')
      return
    }
    log('CollectorProvider: collecting data')

    const hash: string = window.location.hash.substring(3)

    const hashParams = hash.split('&').reduce((result: any, item: any) => {
      const parts = item.split('=')
      result[parts[0]] = parts[1]
      return result
    }, {})

    if (hashParams.id_token) {
      log('CollectorProvider: user logged in event fired')
      trackEvent('user_logged_in', {
        brand
      })

      collect({
        account: {
          token: hashParams.id_token
        }
      })
        .then(collectorCallback)
        .catch((err) => {
          error('failed to store collected data', err)
        })
    }

    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    })
      .then((response: Response) => {
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
    visitor,
    brand,
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
      trackEvent,
      setConversions
    }),
    [
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      trackEvent,
      setIncompleteTriggers,
      setConversions
    ]
  )

  useEffect(() => {
    fireOnLoadTriggers()
  }, [fireOnLoadTriggers])

  // @TODO: this will be scrapped / reworked soon
  useRunOnPathChange(checkCollinsBookingComplete, {
    skip: !booted,
    delay: 0,
    name: 'checkCollinsBookingComplete'
  })

  useRunOnPathChange(collectAndApplyVisitorInfo, {
    skip: !booted,
    delay: initialDelay,
    name: 'collectAndApplyVisitorInfo'
  })

  useRunOnPathChange(fireOnLoadTriggers, {
    skip: !booted,
    delay: initialDelay,
    name: 'fireOnLoadTriggers'
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
  setConversions: (conversion: Conversion[]) => void
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
  setConversions: () => {
    console.error('setConversions not implemented correctly')
  },
  trackEvent: () => {
    console.error('trackEvent not implemented correctly')
  }
})
