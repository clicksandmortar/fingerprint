import React, { useState } from 'react'

export const defaultTriggerCooldown = 60 * 1000

export function useTriggerDelay(cooldownMs: number = defaultTriggerCooldown) {
  const [lastTrigerTimeStamp, setLastTrigerTimeStamp] = useState<number | null>(
    null
  )

  const startCooldown = React.useCallback(() => {
    const currentTimeStamp = Number(new Date())

    setLastTrigerTimeStamp(currentTimeStamp)
  }, [setLastTrigerTimeStamp])

  const getRemainingCooldownMs = React.useCallback(() => {
    if (!lastTrigerTimeStamp) return 0

    const currentTime = Number(new Date())
    const remainingMS = lastTrigerTimeStamp + cooldownMs - currentTime

    return remainingMS
  }, [lastTrigerTimeStamp, cooldownMs])

  const canNextTriggerOccur = React.useCallback(() => {
    return getRemainingCooldownMs() <= 0
  }, [getRemainingCooldownMs])

  return {
    lastTrigerTimeStamp,
    startCooldown,
    canNextTriggerOccur,
    getRemainingCooldownMs
  }
}
