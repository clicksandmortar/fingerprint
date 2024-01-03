import React, { useCallback, useEffect } from 'react'
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { useEntireStore } from '../beautifulSugar/store'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useLogging } from '../hooks/useLogging'
import useRunOnPathChange from '../hooks/useRunOnPathChange'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import Activation from './Activation'

export function Triggers() {
  const { log } = useLogging()

  const {
    config,
    setDisplayedTriggerByInvocation,
    getCombinedTriggers,
    visibleTriggersIssuedByIncomplete,
    idleTime: { idleTimeout },
    difiProps: {
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
      timeout={idleTimeout || altIdleDelay}
      onPresenceChange={(presence: PresenceType) => {
        log('presence changed', presence)
      }}
      onIdle={fireIdleTrigger}
    >
      <Activation />
    </IdleTimerProvider>
  )
}
