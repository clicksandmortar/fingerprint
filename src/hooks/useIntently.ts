import { useEffect, useState } from 'react'

import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'
import { useBrand } from './useBrandConfig'

const selectorRateMs = 100

type IntentlyProps = {
  intently: boolean
}
/**
 * This file contains all Intently related logic and hooks.
 */

function useTrackIntentlyModal({ intently }: IntentlyProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const {
    trackEvent,
    state: { initiated }
  } = useMixpanel()
  const { log, error } = useLogging()

  const brand = useBrand()

  useEffect(() => {
    // prevents the occasional race condition
    if (!initiated) return
    // do not run if the user is in the Fingerprint cohort.
    if (!intently) return

    const id = setInterval(() => {
      const intentlyOuterContainer = document.querySelector('smc-overlay-outer')

      if (!intentlyOuterContainer) {
        return
      }

      const isIntentlyOuterVisible =
        window.getComputedStyle(intentlyOuterContainer).display === 'block'

      if (!isIntentlyOuterVisible) {
        // do not add logs here, gets spammy very quick.
        return
      }

      const intentlyInnerOverlay = document.querySelector('smc-overlay-inner')

      if (!intentlyInnerOverlay) {
        // do not add logs here, gets spammy very quick.
        return
      }

      log(
        'useTrackIntentlyModal: Located Intently modal. Measuring performance'
      )

      setIsVisible(true)
      trackEvent('trigger_displayed', {
        triggerId: 'Intently',
        triggerType: 'INVOCATION_EXIT_INTENT',
        triggerBehaviour: 'BEHAVIOUR_MODAL',
        time: new Date().toISOString(),
        brand
      })

      clearInterval(id)
    }, selectorRateMs)

    return () => {
      clearInterval(id)
    }
  }, [intently, log, setIsVisible, trackEvent, initiated, brand])

  const getHandleTrackAction = (action: 'exit' | 'CTA') => () => {
    log(`useTrackIntentlyModal: user clicked ${action} button`)

    trackEvent(`user_clicked_${action}_button`, {})
  }

  useEffect(() => {
    if (!isVisible) return

    const closeBtn = document.querySelector('[data-close-type="x_close"]')
    const exitHandler = getHandleTrackAction('exit')

    const ctaBtn = document.querySelector('smc-input-group > span')
    const ctaHandler = getHandleTrackAction('CTA')

    if (closeBtn) closeBtn.addEventListener('click', exitHandler)
    else
      error(
        'useTrackIntentlyModal: Could not locate close button, skipping tracking performance.'
      )

    if (ctaBtn) ctaBtn.addEventListener('click', ctaHandler)
    else
      error(
        'useTrackIntentlyModal: Could not locate CTA button, skipping tracking performance.'
      )

    return () => {
      ctaBtn?.removeEventListener('click', ctaHandler)
      closeBtn?.removeEventListener('click', exitHandler)
    }
  }, [error, getHandleTrackAction, isVisible])

  return { isVisible, setIsVisible }
}

const useRemoveIntently = ({ intently }: IntentlyProps) => {
  const { log } = useLogging()

  // Removes the intently overlay, if intently is false
  useEffect(() => {
    if (intently) return

    log('useRemoveIntently: removing intently overlay')

    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll(
        'div[id^=smc-v5-overlay-]'
      )

      Array.prototype.forEach.call(locatedIntentlyScript, (node: any) => {
        node.parentNode.removeChild(node)

        log('useRemoveIntently: successfully removed intently overlay')

        clearInterval(runningInterval)
      })
    }, selectorRateMs)

    return () => {
      clearInterval(runningInterval)
    }
  }, [intently, log])
}

export function useIntently() {
  const [intently, setIntently] = useState<boolean>(true)

  useRemoveIntently({ intently })
  useTrackIntentlyModal({ intently })

  return { setIntently, intently }
}

export default useIntently
