import { useEffect, useState } from 'react'
import { useLogging } from './useLogging'

const useExitIntentDelay = (delay: number = 0) => {
  const { log } = useLogging()

  const [hasDelayPassed, setHasDelayPassed] = useState(false)

  useEffect(() => {
    log(`Exit intents are suspended because of initiation delay of ${delay}ms`)

    setTimeout(() => {
      setHasDelayPassed(true)
      log('Exit intents can be issued again.')
    }, delay)
  }, [delay])

  return { hasDelayPassed }
}

export default useExitIntentDelay
