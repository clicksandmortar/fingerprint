import React, { useState } from 'react'

export const defaultTriggerCooldown = 60 * 1000

export function useTriggerDelay(cooldownMs: number = defaultTriggerCooldown) {
  const [lastTriggerTimeStamp, setLastTriggerTimeStamp] = useState<
    number | null
  >(null)

  const startCooldown = React.useCallback(() => {
    const currentTimeStamp = Number(new Date())

    setLastTriggerTimeStamp(currentTimeStamp)
  }, [setLastTriggerTimeStamp])

  const getRemainingCooldownMs = React.useCallback(() => {
    if (!lastTriggerTimeStamp) return 0

    const currentTime = Number(new Date())
    const remainingMS = lastTriggerTimeStamp + cooldownMs - currentTime

    return remainingMS
  }, [lastTriggerTimeStamp, cooldownMs])

  const canNextTriggerOccur = React.useCallback(() => {
    return getRemainingCooldownMs() <= 0
  }, [getRemainingCooldownMs])

  return {
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs
  }
}
