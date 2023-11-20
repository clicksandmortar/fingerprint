import { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'

type FuncProp = () => void
type Config = {
  skip?: boolean
  delay?: number
}
// takes a function and runs it when the path changes
// optionally takes a skip condition and init delay
const useRunOnPathChange = (func: FuncProp, config?: Config) => {
  const [lastCollected, setLastCollected] = useState<string>('')
  const { log } = useLogging()

  useEffect(() => {
    if (config?.skip) {
      log('useRunOnPathChange: skip configured, not capturing')
      return
    }
    if (!location.href) {
      log('useRunOnPathChange: no href on location object: ', location)
      return
    }
    if (location.href === lastCollected) {
      log('useRunOnPathChange: location href and last collected are the same ', location.href, lastCollected)
      return
    }

    // added timeout to prevent occasional double firing on page load
    const tId = setTimeout(() => {
      log('useRunOnPathChange: running for path: ', location.href)

      setLastCollected(location.href)
      func()
    }, config?.delay || 300)

    return () => {
      clearTimeout(tId)
    }
  }, [location.href, func, setLastCollected, config])
}

export default useRunOnPathChange
