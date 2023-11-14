import React, { useEffect, useState } from 'react'
import { IncompleteTrigger, Trigger } from '../client/types'
import useIsElementVisible from './useIsElementVisible'

const interval = 250

// @TODO: come up with a better name
type ReducedTrigger = { trigger: Trigger; selector: string }
/**
 * Some triggers rely on Frontend signals (like visibility of an element) to determine whether they should be invoked or not.
 * This hook drives the logic for those triggers inside (currently) the Collector.
 */
const useIncompleteTriggers = () => {
  const [incompleteTriggers, setIncompleteTriggers] = useState<
    IncompleteTrigger[]
  >([])

  const [visibleTriggers, setVisibleTriggers] = useState<Trigger[]>([])

  const { getIsVisible } = useIsElementVisible()

  const visibilityQuerySelectors = React.useMemo(() => {
    return incompleteTriggers
      .map((trigger) =>
        trigger.signals.map((signal) => {
          if (signal.op !== 'CanSeeElementOnPage') return null

          return {
            trigger,
            selector: signal.parameters.selector
          }
        })
      )
      .flat()
      .filter((selector) => selector !== null) as ReducedTrigger[]
  }, [incompleteTriggers])
  // @TODO: ^ there is a proper type to eliminate nulls

  useEffect(() => {
    if (!visibilityQuerySelectors.length) return

    const intId = setInterval(() => {
      const visibleItems = visibilityQuerySelectors
        .map((reducedTrigger) => {
          const isElementVisible = getIsVisible(reducedTrigger.selector)

          if (isElementVisible) return reducedTrigger.trigger
          return null
        })
        .filter(Boolean) as Trigger[]

      setVisibleTriggers(visibleItems)
    }, interval)

    return () => {
      clearInterval(intId)
    }
  }, [incompleteTriggers, getIsVisible])

  return {
    incompleteTriggers,
    setIncompleteTriggers,
    visibleTriggers
  }
}

export default useIncompleteTriggers
