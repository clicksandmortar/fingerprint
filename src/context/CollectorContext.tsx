import React, { createContext, useEffect, useState } from 'react'
import { useCollector } from '../hooks/useCollector'
import { useLogging } from './LoggingContext'
import { useFingerprint } from './FingerprintContext'
import { useVisitor } from './VisitorContext'
import { Trigger } from '../client/types'
import { TriggerModal } from '../behaviours/TriggerModal'

export type CollectorProviderProps = {
  children?: React.ReactNode
}

export const CollectorProvider = ({ children }: CollectorProviderProps) => {
  const { log } = useLogging()
  const { appId, booted } = useFingerprint()
  const { visitor } = useVisitor()
  const { mutateAsync: collect } = useCollector()
  const [trigger, setTrigger] = useState<Trigger>({})

  // @todo this should be invoked when booted
  // and then on any window page URL changes.
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot')
      return
    }

    log('CollectorProvider: collecting data')

    collect({
      appId,
      visitor,
      page: {
        url: window.location.href,
        title: document.title,
        params: new URLSearchParams(window.location.search)
          .toString()
          .split('&')
          .reduce((acc, cur) => {
            const [key, value] = cur.split('=')
            if (!key) return acc
            acc[key] = value
            return acc
          }, {})
      },
      referrer: {
        url: document.referrer,
        title: document.referrer,
        utm: {
          source: '',
          medium: '',
          campaign: '',
          term: '',
          content: ''
        }
      }
    })
      .then((response) => {
        console.log('Sent collector data, retreived:', response)
        if (response.trigger) {
          setTrigger(response.trigger)
        }
      })
      .catch((error) => {
        console.error('failed to store collected data', error)
      })

    log('CollectorProvider: collected data')
  }, [booted])

  return (
    <CollectorContext.Provider value={{}}>
      {children}
      {trigger && trigger.behaviour === 'modal' && (
        <TriggerModal trigger={trigger} />
      )}
    </CollectorContext.Provider>
  )
}
export type CollectorContextInterface = {}

export const CollectorContext = createContext<CollectorContextInterface>({})
