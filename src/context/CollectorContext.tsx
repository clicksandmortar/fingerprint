import React, { createContext, useEffect, useState } from 'react'
import { useCollector } from '../hooks/useCollector'
import { useLogging } from './LoggingContext'
import { Handler, useFingerprint } from './FingerprintContext'
import { useVisitor } from './VisitorContext'
import { Trigger } from '../client/types'

export type CollectorProviderProps = {
  children?: React.ReactNode
  handlers?: Handler[]
}

export const CollectorProvider = ({
  children,
  handlers
}: CollectorProviderProps) => {
  const { log, error } = useLogging()
  const { appId, booted } = useFingerprint()
  const { visitor } = useVisitor()
  const { mutateAsync: collect } = useCollector()
  const [trigger, setTrigger] = useState<Trigger>({})

  const showTrigger = (trigger: Trigger) => {
    if (!trigger) {
      return null
    }

    const handler =
      handlers?.find(
        (handler: Handler) =>
          handler.id === trigger.id && handler.behaviour === trigger.behaviour
      ) ||
      handlers?.find(
        (handler: Handler) => handler.behaviour === trigger.behaviour
      )

    if (!handler) {
      error('No handler found for trigger', trigger)
      return null
    }

    if (!handler.invoke) {
      error('No invoke method found for handler', handler)
      return null
    }

    return handler.invoke(trigger)
  }

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
        path: window.location.pathname,
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
        log('Sent collector data, retreived:', response)
        if (response.trigger) {
          setTrigger(response.trigger)
        }
      })
      .catch((err) => {
        error('failed to store collected data', err)
      })

    log('CollectorProvider: collected data')
  }, [booted])

  return (
    <CollectorContext.Provider value={{}}>
      {children}
      {showTrigger(trigger)}
    </CollectorContext.Provider>
  )
}
export type CollectorContextInterface = {}

export const CollectorContext = createContext<CollectorContextInterface>({})
