import React, { createContext, useContext, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoggingProvider } from './LoggingContext'
import { CollectorProvider } from './CollectorContext'
import { VisitorProvider } from './VisitorContext'
import { PageView, Trigger } from '../client/types'
import { TriggerModal } from '../behaviours/TriggerModal'

const queryClient = new QueryClient()

// @todo refactor where this lives
type TriggerCallback = (
  trigger: Trigger
) => void | JSX.Element | React.ReactPortal

// @todo refactor where this lives
export type Handler = {
  id?: string
  behaviour?: string
  invoke?: TriggerCallback
}

// @todo refactor where this lives
const includedHandlers: Handler[] = [
  {
    id: 'modal',
    behaviour: 'modal',
    invoke: (trigger: Trigger) => <TriggerModal trigger={trigger} />
  }
]

export type FingerprintProviderProps = {
  appId?: string
  children?: React.ReactNode
  debug?: boolean
  defaultHandlers?: Handler[]
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = ({
  appId,
  children,
  debug,
  defaultHandlers
}: FingerprintProviderProps) => {
  const [booted, setBooted] = useState(false)
  const [handlers, setHandlers] = useState(defaultHandlers || includedHandlers)

  // @todo Move this to a Handlers Context and add logging.
  const registerHandler = (trigger: Trigger) => {
    setHandlers((handlers) => {
      return [...handlers, trigger]
    })
  }

  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required')
    }

    if (booted) {
      return
    }

    const performBoot = async () => {
      // @todo this should be invoked when booted.
      // It will call out to the API to confirm the
      // appId is valid and return the app configuration.
      setBooted(true)
    }

    performBoot()
  }, [])

  if (!appId) {
    return null
  }

  return (
    <LoggingProvider debug={debug}>
      <QueryClientProvider client={queryClient}>
        <FingerprintContext.Provider
          value={{
            appId,
            booted,
            currentTrigger: {},
            registerHandler,
            trackEvent: () => {
              alert('trackEvent not implemented')
            },
            trackPageView: () => {
              alert('trackPageView not implemented')
            },
            unregisterHandler: () => {
              alert('unregisterHandler not implemented')
            }
          }}
        >
          <VisitorProvider>
            <CollectorProvider handlers={handlers}>
              {children}
            </CollectorProvider>
          </VisitorProvider>
        </FingerprintContext.Provider>
      </QueryClientProvider>
    </LoggingProvider>
  )
}

export interface FingerprintContextInterface {
  appId: string
  booted: boolean
  currentTrigger: Trigger
  registerHandler: (trigger: Trigger) => void
  trackEvent: (event: Event) => void
  trackPageView: (pageView: PageView) => void
  unregisterHandler: (trigger: Trigger) => void
}

const defaultFingerprintState: FingerprintContextInterface = {
  appId: '',
  booted: false,
  currentTrigger: {},
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {}
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})

export const useFingerprint = () => {
  return useContext(FingerprintContext)
}
