import React from 'react'
import { useIdleTime } from '../beautifulSugar/slices/idleTimeSlice'
import { useTriggerConfig } from './useBrandConfig'
import { useLogging } from './useLogging'

export function useTriggerDelay() {
  const { lastTriggerTimeStamp, setLastTriggerTimeStamp } = useIdleTime()

  const triggerConfig = useTriggerConfig()
  const cooldownMs = triggerConfig.triggerCooldownSecs * 1000
  const idleDelay = triggerConfig.userIdleThresholdSecs * 1000

  const { log } = useLogging()

  const startCooldown = React.useCallback(() => {
    const currentTimeStamp = Number(new Date())

    setLastTriggerTimeStamp(currentTimeStamp)
  }, [setLastTriggerTimeStamp])

  const getRemainingCooldownMs = React.useCallback(() => {
    if (!lastTriggerTimeStamp) return 0

    const currentTime = Number(new Date())
    const remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime

    if (remainingMS < 0) return 0

    return remainingMS
  }, [lastTriggerTimeStamp, cooldownMs])

  const canNextTriggerOccur = React.useCallback(() => {
    return getRemainingCooldownMs() === 0
  }, [getRemainingCooldownMs])

  /**
   * Recalculate the idle delay based on config / default val and cooldown.
   */
  const getIdleStatusDelay = React.useCallback((): number => {
    const cooldownDelay = getRemainingCooldownMs()

    const delayAdjustedForCooldown = idleDelay + cooldownDelay

    log(
      `Setting idle delay at ${delayAdjustedForCooldown}ms (cooldown ${cooldownDelay}ms + idleDelay ${idleDelay}ms)`
    )

    return delayAdjustedForCooldown
  }, [idleDelay, getRemainingCooldownMs, log])

  return {
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs,
    getIdleStatusDelay
  }
}
