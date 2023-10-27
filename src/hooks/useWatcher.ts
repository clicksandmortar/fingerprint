import React, { useContext, useEffect, useState } from 'react'
import { CollectorResponse } from '../client/types'
import { CollectorContext } from '../context/CollectorContext'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useVisitor } from '../context/VisitorContext'
import { fakeTriggers } from '../utils/__dev/fakeTriggers'
import { useCollectorMutation } from './useCollectorMutation'
import { useFingerprint } from './useFingerprint'

/**
 * What even is a watcher? No idea. But sounds important.
 *
 * ___ THE WATCHERS ____
 *
 * or fcking  "Keylogg's Frosties". idk
 */
export const useWatchers = () => {
  const { log, error } = useLogging()
  const { visitor, session } = useVisitor()
  const { trackEvent } = useMixpanel()

  const { addPageTriggers } = useContext(CollectorContext)

  const { mutateAsync: collect } = useCollectorMutation()

  const [foundWatchers, setFoundWatchers] = useState<Map<string, boolean>>(
    new Map()
  )
  const { appId } = useFingerprint()

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
              appId,
              visitor,
              sessionId: session?.id,
              elements: [
                {
                  path: window.location.pathname,
                  selector: configuredSelector
                }
              ]
            })
              .then(async (response: Response) => {
                const payload: CollectorResponse = await response.json()

                log('Sent collector data, retrieved:', payload)

                // addPageTriggers(payload?.pageTriggers)
                addPageTriggers(fakeTriggers)
              })
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
    [appId, collect, error, foundWatchers, log, session, trackEvent, visitor]
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

// export as a component. for now. Tested, add works
export const WithWatchers = () => {
  useWatchers()

  return null
}

export default useWatchers
