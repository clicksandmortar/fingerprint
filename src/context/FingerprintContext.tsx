import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { clientHandlers } from '../client/handler'
import { FingerprintConfig, Trigger } from '../client/types'
import { CollectorProvider } from './CollectorContext'
import { LoggingProvider } from './LoggingContext'
import { MixpanelProvider } from './MixpanelContext'
import { VisitorProvider } from './VisitorContext'
import { useConsentCheck } from '../hooks/useConsentCheck'

const queryClient = new QueryClient()

export const cookieAccountJWT = 'b2c_token'

export type FingerprintProviderProps = {
  appId?: string
  tenantId?: string
  children?: React.ReactNode
  consent?: boolean
  consentCallback?: () => boolean
  debug?: boolean
  defaultHandlers?: Trigger[]
  initialDelay?: number
  exitIntentTriggers?: boolean
  idleTriggers?: boolean
  pageLoadTriggers?: boolean
  config?: FingerprintConfig
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = ({
  appId,
  tenantId,
  children,
  consent = true,
  consentCallback,
  debug = false,
  defaultHandlers,
  initialDelay = 0,
  exitIntentTriggers = true,
  idleTriggers = true,
  pageLoadTriggers = true,
  config
}: FingerprintProviderProps) => {
  const [booted, setBooted] = useState(false)
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers)
  const consentGiven = useConsentCheck(consent, consentCallback)

  // @todo Move this to a Handlers Context and add logging.
  const addAnotherHandler = React.useCallback(
    (trigger: Trigger) => {
      setHandlers((handlers) => {
        return [...handlers, trigger]
      })
    },
    [setHandlers]
  )

  useEffect(() => {
    if (!appId) throw new Error('C&M Fingerprint: appId is required')
    if (booted) return
    if (!consentGiven) return

    const performBoot = async () => {
      setBooted(true)
    }

    performBoot()
  }, [consentGiven])

  if (!appId) {
    return null
  }

  if (!consentGiven) {
    return children
  }

  return (
    <LoggingProvider debug={debug}>
      <QueryClientProvider client={queryClient}>
        <FingerprintContext.Provider
          value={{
            appId,
            tenantId,
            booted,
            currentTrigger: null,
            registerHandler: addAnotherHandler,
            initialDelay,
            idleTriggers,
            pageLoadTriggers,
            exitIntentTriggers,
            config
          }}
        >
          <VisitorProvider>
            <MixpanelProvider>
              <CollectorProvider handlers={handlers}>
                <ErrorBoundary
                  onError={(error, info) => console.error(error, info)}
                  fallback={<div>An application error occurred.</div>}
                >
                  {children}
                </ErrorBoundary>
              </CollectorProvider>
            </MixpanelProvider>
          </VisitorProvider>
        </FingerprintContext.Provider>
      </QueryClientProvider>
    </LoggingProvider>
  )
}

export interface FingerprintContextInterface {
  appId: string
  tenantId?: string
  booted: boolean
  consent?: boolean
  currentTrigger: Trigger | null
  exitIntentTriggers: boolean
  idleTriggers: boolean
  pageLoadTriggers: boolean
  initialDelay: number
  registerHandler: (trigger: Trigger) => void
  config?: FingerprintConfig
}

const defaultFingerprintState: FingerprintContextInterface = {
  appId: '',
  tenantId: undefined,
  booted: false,
  consent: false,
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  config: {
    idleDelay: undefined,
    triggerCooldown: 60 * 1000,
    exitIntentDelay: 0
  }
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})
