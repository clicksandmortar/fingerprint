import React, { useEffect, useState } from 'react'
import { useLogging } from '../context/LoggingContext'

type FuncProp = () => void
type Config = {
  skip?: boolean
  delay?: number
}

// takes a function and runs it when the path changes
// optionally takes a skip condition and init delay
// @TODO: add support for multiple funcs so we can contain all of them in a single listener if needed
const reattemptIntervalMs = 500
const useRunOnPathChange = (func: FuncProp, config?: Config) => {
  const [lastCollectedHref, setLastCollectedHref] = useState<string>('')

  const { log } = useLogging()

  const run = React.useCallback(() => {
    if (config?.skip) return

    if (!location.href) return

    if (location.href === lastCollectedHref) return

    log('useRunOnPathChange: running for path: ', location.href)
    setLastCollectedHref(location.href)

    func()
  }, [func, config, lastCollectedHref])

  useEffect(() => {
    log(
      `useRunOnPathChange: running for every path change with ${reattemptIntervalMs} MS`
    )
    const iId = setInterval(run, reattemptIntervalMs)

    return () => clearInterval(iId)
  }, [run])
}

export default useRunOnPathChange
