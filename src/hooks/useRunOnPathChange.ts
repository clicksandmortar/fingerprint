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
  const [lastCollectedPath, setLastCollectedPath] = useState<string>('')
  const [lastCollectedHash, setLastCollectedHash] = useState<string>('')
  const [lastCollectedQuery, setLastCollectedQuery] = useState<string>('')
  const { log } = useLogging()

  useEffect(() => {
    if (config?.skip) return
    if (!location.pathname) return
    if (
      location.pathname === lastCollectedPath
      && location.hash === lastCollectedHash
      && location.search === lastCollectedQuery
    ) return

    // added timeout to prevent occasional double firing on page load
    const tId = setTimeout(() => {
      log('useRunOnPathChange: running for path: ', location.pathname)

      setLastCollectedPath(location.pathname)
      setLastCollectedHash(location.hash)
      setLastCollectedQuery(location.search)
      func()
    }, config?.delay || 300)

    return () => {
      clearTimeout(tId)
    }
  }, [location.pathname, location.hash, func, setLastCollectedPath, config])
}

export default useRunOnPathChange
