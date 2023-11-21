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
  const [lastCollectedPath, setLastCollectedPath] = useState<string>()
  const [lastCollectedHash, setLastCollectedHash] = useState<string>('')
  const [lastCollectedQuery, setLastCollectedQuery] = useState<string>('')

  const { log } = useLogging()

  useEffect(() => {
    if (config?.skip) {
      log('useRunOnPathChange: skip configured, not capturing')
      return
    }
    if (!location.pathname) {
      log('useRunOnPathChange: no pathname on location object: ', location)
      return
    }
    if (
      location.pathname === lastCollectedPath &&
      location.hash === lastCollectedHash &&
      location.search === lastCollectedQuery
    ) {
      log(
        'useRunOnPathChange: location pathname and last collected are the same ',
        location.pathname,
        lastCollectedPath
      )
      return
    }

    // added timeout to prevent occasional double firing on page load
    // const tId = setTimeout(() => {
    log('useRunOnPathChange: running for path: ', location.pathname)

    setLastCollectedPath(location.pathname)
    setLastCollectedHash(location.hash)
    setLastCollectedQuery(location.search)
    func()
    // }, 50)

    return () => {
      log(
        'useRunOnPathChange: clearing 300ms timeout',
        location.pathname,
        lastCollectedPath
      )
      // clearTimeout(tId)
    }
  }, [
    location.pathname,
    location.hash,
    location.search,
    func,
    setLastCollectedPath,
    setLastCollectedHash,
    setLastCollectedQuery,
    config
  ])
}

export default useRunOnPathChange
