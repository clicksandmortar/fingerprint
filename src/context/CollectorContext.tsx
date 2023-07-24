import React, { createContext, useEffect } from 'react'
import { useCollector } from '../hooks/useCollector'
import { useLogging } from './LoggingContext'

export type CollectorProviderProps = {}

export type CollectorContextInterface = {}

export const CollectorProvider = () => {
  const { log } = useLogging()
  // const { fingerprint } = useFingerprint()
  const { mutateAsync: collect } = useCollector()

  // @todo this should be invoked when booted
  // and then on any window page URL changes.
  useEffect(() => {
    log('CollectorProvider: collecting data')

    collect({
      type: 'pageview',
      data: {}
    })
      .then((response) => {
        console.warn('sent collect data, retrieved:', response)
      })
      .catch((error) => {
        console.error('failed to store collected data', error)
      })

    log('CollectorProvider: collected data')
  }, [])

  return (
    <CollectorContext.Provider value={{}}>
      {/* {fingerprint.session.firstVisit === true
        ? invokeFirstVisit()
        : invokeReturningVisit()} */}
    </CollectorContext.Provider>
  )
}

export const CollectorContext = createContext<CollectorContextInterface>({})
