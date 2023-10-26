import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'

const useExitIntentDelay = (delay: number = 0) => {
  const { log } = useLogging()

  const [hasDelayPassed, setHasDelayPassed] = useState(false)

  useEffect(() => {
    log(`Exit intents are suspended because of initiation delay of ${delay}ms`)

    setTimeout(() => {
      setHasDelayPassed(true)
      log()
    }, delay)
  }, [delay])

  return { hasDelayPassed }
}

export default useExitIntentDelay
