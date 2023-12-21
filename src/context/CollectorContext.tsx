/* eslint-disable max-lines */
/* eslint-disable require-jsdoc */
import React, { createContext, useCallback, useEffect } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { useEntireStore } from '../beautifulSugar/store'
import { Conversion, IncompleteTrigger, Trigger } from '../client/types'
import { useCollectorMutation } from '../hooks/api/useCollectorMutation'
import { useBrand } from '../hooks/useBrandConfig'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useLogging } from '../hooks/useLogging'
import useRunOnPathChange from '../hooks/useRunOnPathChange'
import { useTracking } from '../hooks/useTracking'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { getPagePayload, getReferrer } from '../utils/page'
import { hasVisitorIDInURL } from '../utils/visitor_id'

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
export function CollectorProvider({ children }: CollectorProviderProps) {
  const { log, error } = useLogging()

  const {
    config,
    visitor,
    displayedTriggersIds,
    setPageTriggers,
    // addDisplayedTrigger,
    setDisplayedTriggerByInvocation,
    getHandlerForTrigger,
    getIsBehaviourVisible,
    setActiveTrigger,
    removeActiveTrigger,
    getCombinedTriggers,
    tracking: { initiated: mixpanelBooted },
    // intently: { setIntently },
    visibleTriggersIssuedByIncomplete,
    idleTime: { idleTimeout },
    setIncompleteTriggers,
    conversions: { setConversions },
    difiProps: {
      defaultHandlers: handlers,
      initialDelay,
      exitIntentTriggers,
      idleTriggers,
      pageLoadTriggers,
      booted
    }
    // conversions: { setConversions }
  } = useEntireStore()
  const combinedTriggers = getCombinedTriggers()
  const { trackEvent } = useTracking()

  const { canNextTriggerOccur, startCooldown, getRemainingCooldownMs } =
    useTriggerDelay()

  const { mutateAsync: collect } = useCollectorMutation()

  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler, resetState: reRegisterExitIntent } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })

  const brand = useBrand()

  useEffect(() => {
    if (!visibleTriggersIssuedByIncomplete?.length) return

    // TODO: eventually we may want support for multiple signals so this
    // will need to be refactored / reworked
    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE')
  }, [visibleTriggersIssuedByIncomplete, setDisplayedTriggerByInvocation])

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
    if (!visibleTriggersIssuedByIncomplete?.length) return

    setDisplayedTriggerByInvocation('INVOCATION_ELEMENT_VISIBLE')
  }, [setDisplayedTriggerByInvocation, visibleTriggersIssuedByIncomplete])

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

  useEffect(() => {
    if (!mixpanelBooted) return

    if (hasVisitorIDInURL()) {
      log('CollectorProvider: visitor ID in URL, collecting data')
      trackEvent('abandoned_journey_landing', {
        from_email: true
      })
    }
  }, [trackEvent, log, mixpanelBooted])

  // THIS should stay in collector...
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
    }

    collect({
      page: getPagePayload() || undefined,
      referrer: getReferrer() || undefined
    })
      .then((response: Response) => {
        if (response.status === 204) {
          // setIntently(true)
          return
        }
      })

      .catch((err) => {
        error('failed to store collected data', err)
      })
  }, [visitor, brand, log, collect, trackEvent, error /*setIntently*/])

  const collectorContextVal = React.useMemo(
    () => ({
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      setIncompleteTriggers,
      setConversions
    }),
    [
      setPageTriggers,
      removeActiveTrigger,
      setActiveTrigger,
      setIncompleteTriggers,
      setConversions
    ]
  )
  useEffect(() => {
    fireOnLoadTriggers()
  }, [fireOnLoadTriggers])

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
  }
})
