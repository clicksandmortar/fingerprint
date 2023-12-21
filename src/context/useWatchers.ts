/* eslint-disable max-lines */
/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from 'react'
import { useCollectorMutation } from '../hooks/api/useCollectorMutation'
import { useTracking } from '../hooks/init/useTracking'
import { useLogging } from '../hooks/useLogging'

type Props = {}

const useWatchers = (props: Props) => {
  const { trackEvent } = useTracking()
  const { collect } = useCollectorMutation()
  const { log } = useLogging()
  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )
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
}

export default useWatchers
