import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'

/**
 *  Remove intently overlay if we end up in the Fingerprint cohort
 */
const useKillIntently = () => {
  const { log } = useLogging()
  const [intently, setIntently] = useState<boolean>(false)

  // Removes the intently overlay, if intently is false
  useEffect(() => {
    if (intently) return

    log('CollectorProvider: removing intently overlay')

    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll(
        'div[id^=smc-v5-overlay-]'
      )

      Array.prototype.forEach.call(locatedIntentlyScript, (node: any) => {
        node.parentNode.removeChild(node)

        log('CollectorProvider: successfully removed intently overlay')

        clearInterval(runningInterval)
      })
    }, 100)

    return () => {
      clearInterval(runningInterval)
    }
  }, [intently, log])

  return { intently, setIntently }
}

export default useKillIntently
