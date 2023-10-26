import uniqueBy from 'lodash.uniqby'
import React, { createContext, useCallback, useEffect, useState } from 'react'
// import { isMobile } from 'react-device-detect' <= reminder where isMobile came from
import { IdleTimerProvider, PresenceType } from 'react-idle-timer'
import { useExitIntent } from 'use-exit-intent'
import { Trigger } from '../client/types'
import { WithCollectOnBoot } from '../hooks/useCollectOnBoot'
import useExitIntentDelay from '../hooks/useExitIntentDelay'
import { useFingerprint } from '../hooks/useFingerprint'
import useKillIntently from '../hooks/useKillIntently'
import { useTriggerDelay } from '../hooks/useTriggerDelay'
import { WithWatchers } from '../hooks/useWatcher'
import { useLogging } from './LoggingContext'
import { useMixpanel } from './MixpanelContext'

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
  const { exitIntentTriggers, idleTriggers, config } = useFingerprint()
  const configIdleDelay = config?.idleDelay

  const { canNextTriggerOccur, startCooldown, getRemainingCooldownMs } =
    useTriggerDelay(config?.triggerCooldown)
  const { trackEvent } = useMixpanel()

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

  const { setIntently } = useKillIntently()

  /**
   * add triggers to existing ones, keep unique to prevent multi-firing
   */
  const addPageTriggers = (triggers: Trigger[]) => {
    setPageTriggers((prev) =>
      uniqueBy<Trigger>([...prev, ...(triggers || [])], 'id')
    )
  }

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

  const { hasDelayPassed } = useExitIntentDelay(config?.exitIntentDelay)

  const launchExitTrigger = React.useCallback(() => {
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
    setDisplayTrigger('INVOCATION_EXIT_INTENT')
    startCooldown()
  }, [
    log,
    canNextTriggerOccur,
    getRemainingCooldownMs,
    reRegisterExitIntent,
    hasDelayPassed
  ])

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

  useEffect(() => {
    if (!pageTriggers?.length) return

    setIdleTimeout(getIdleStatusDelay())
  }, [pageTriggers])

  const setTrigger = React.useCallback(
    (trigger: Trigger) => {
      log('CollectorProvider: manually setting trigger', trigger)
      addPageTriggers([trigger])
      setDisplayTrigger(trigger.invocation)
    },
    [log, setDisplayTrigger]
  )

  const collectorContextVal = React.useMemo(
    () => ({
      addPageTriggers,
      resetDisplayTrigger,
      setTrigger,
      trackEvent,
      setIntently
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
        <WithWatchers />
        <WithCollectOnBoot />
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
  setIntently: (bool: boolean) => void
  trackEvent: (event: string, properties?: any) => void
}
export const CollectorContext = createContext<CollectorContextInterface>({
  addPageTriggers: () => {},
  resetDisplayTrigger: () => {},
  setTrigger: () => {},
  setIntently: () => {},
  trackEvent: () => {}
})
