import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { useMixpanel } from '../context/MixpanelContext'

/**
 * This file contains all Intently related logic and hooks.
 */

function useTrackIntentlyModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { trackEvent } = useMixpanel()
  const { log, error } = useLogging()

  useEffect(() => {
    const id = setInterval(() => {
      const item = document.querySelector('smc-overlay-inner') as HTMLElement

      if (!item) {
        log(
          'useTrackIntentlyModal: Could not locate intently modal, not tracking performance.'
        )
        return
      }

      log(
        'useTrackIntentlyModal: Located Intently modal. Releasing the Kraken.'
      )

      setIsVisible(true)
      clearInterval(id)
    }, 1000)

    return () => clearInterval(id)
  }, [setIsVisible])

  const getHandleTrackAction = (action: 'exit' | 'CTA') => () => {
    log(`useTrackIntentlyModal: user clicked ${action} button`)

    trackEvent(`intently__user_clicked_${action}_button`, {})
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
  }, [isVisible])

  return { isVisible, setIsVisible }
}

const useRemoveIntently = () => {
  const [intently, setIntently] = useState<boolean>(false)
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
    }, 100)

    return () => {
      clearInterval(runningInterval)
    }
  }, [intently, log])

  return {
    intently,
    setIntently
  }
}

export function useIntently() {
  useTrackIntentlyModal()

  const intentlyState = useRemoveIntently()
  return intentlyState
}

export default useIntently
