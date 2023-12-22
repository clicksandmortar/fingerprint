import React, { useCallback, useEffect } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { useEntireStore } from '../beautifulSugar/store'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useLogging } from '../hooks/useLogging'
import useRunOnPathChange from '../hooks/useRunOnPathChange'
import { useTriggerDelay } from '../hooks/useTriggerDelay'

export function Triggers() {
  const { log, error } = useLogging()

  const {
    config,
    displayedTriggersIds,
    setDisplayedTriggerByInvocation,
    getHandlerForTrigger,
    getIsBehaviourVisible,
    getCombinedTriggers,
    visibleTriggersIssuedByIncomplete,
    idleTime: { idleTimeout },
    difiProps: {
      defaultHandlers: handlers,
      initialDelay,
      exitIntentTriggers,
      idleTriggers,
      pageLoadTriggers,
      booted
    }
  } = useEntireStore()
  const altIdleDelay = config?.trigger?.userIdleThresholdSecs * 1000
  const combinedTriggers = getCombinedTriggers()

  const { canNextTriggerOccur, startCooldown, getRemainingCooldownMs } =
    useTriggerDelay()

  // @todo remove this for our own exit intent implementation, for instance:
  // https://fullstackheroes.com/tutorials/react/exit-intent-react/
  const { registerHandler, resetState: reRegisterExitIntent } = useExitIntent({
    cookie: { key: '_cm_exit', daysToExpire: 0 }
  })

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
        `Collector - TriggerComponent: No trigger found for displayedTriggersIds`,
        displayedTriggersIds
      )
      return null
    }

    log('Collector - TriggerComponent: available handlers include: ', handlers)
    log(
      'Collector - TriggerComponent: activeTriggers to match are: ',
      activeTriggers
    )

    log(
      'Collector - TriggerComponent: attempting to show trigger',
      activeTriggers
    )

    return activeTriggers.map((trigger) => {
      const handler = getHandlerForTrigger(trigger)

      if (!handler) {
        log(
          'Collector - TriggerComponent: No handler found for trigger',
          trigger
        )
        return null
      }
      if (!handler.invoke) {
        log(
          'Collector - TriggerComponent: No invoke method found for handler',
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
          `Collector - TriggerComponent: Behaviour ${trigger.behaviour} (triggerId: ${trigger.id}) is already visible and does NOT support multiple triggers. Not showing.`,
          trigger.id
        )
        return null
      }

      const potentialComponent = handler.invoke?.(trigger)

      if (potentialComponent && React.isValidElement(potentialComponent)) {
        log(
          'Collector - TriggerComponent: Potential component for trigger is valid. Mounting'
        )
        return potentialComponent
      }

      log(
        'Collector: Potential component for trigger invalid. Running as regular func.'
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
    log('Collector: attempting to fire idle time trigger')
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

    log('Collector: attempting to fire exit trigger')
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

  useEffect(() => {
    if (!exitIntentTriggers) return

    log('Collector: attempting to register exit trigger')

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
    log('Collector: attempting to fire on-page-load trigger')
    setDisplayedTriggerByInvocation('INVOCATION_PAGE_LOAD', true)
  }, [pageLoadTriggers, combinedTriggers, log, setDisplayedTriggerByInvocation])

  useEffect(() => {
    fireOnLoadTriggers()
  }, [fireOnLoadTriggers])

  useRunOnPathChange(fireOnLoadTriggers, {
    skip: !booted,
    delay: initialDelay,
    name: 'fireOnLoadTriggers'
  })

  return (
    <IdleTimerProvider
      // TODO: figure out why this is misbehaving
      timeout={idleTimeout || altIdleDelay}
      onPresenceChange={(presence: PresenceType) => {
        log('presence changed', presence)
      }}
      onIdle={fireIdleTrigger}
    >
      {/* {children} */}
      {TriggerComponent()}

      {/* @TODO: this component has no access to any collector related stuff. Deal with this ASAP */}
    </IdleTimerProvider>
  )
}
