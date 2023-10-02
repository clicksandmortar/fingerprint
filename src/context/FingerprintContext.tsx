import React, { createContext, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoggingProvider } from './LoggingContext'
import { CollectorProvider } from './CollectorContext'
import { VisitorProvider } from './VisitorContext'
import { PageView, Trigger } from '../client/types'
import { ErrorBoundary } from 'react-error-boundary'
import { MixpanelProvider } from './MixpanelContext'
import { Handler, clientHandlers } from '../client/handler'

const queryClient = new QueryClient()

export type FingerprintProviderProps = {
  appId?: string
  children?: React.ReactNode
  consent?: boolean
  consentCallback?: () => boolean
  debug?: boolean
  defaultHandlers?: Handler[]
  initialDelay?: number
  exitIntentTriggers?: boolean
  idleTriggers?: boolean
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = ({
  appId,
  children,
  consent = false,
  consentCallback,
  debug,
  defaultHandlers,
  initialDelay = 0,
  exitIntentTriggers = true,
  idleTriggers = true
}: // idleDelay = 0,
FingerprintProviderProps) => {
  const [consentGiven, setConsentGiven] = useState(consent)
  const [booted, setBooted] = useState(false)
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers)

  // @todo Move this to a Handlers Context and add logging.
  const registerHandler = React.useCallback(
    (trigger: Trigger) => {
      setHandlers((handlers) => {
        return [...handlers, trigger]
      })
    },
    [setHandlers]
  )

  /**
   * Effect checks for user consent either via direct variable or a callback.
   * in any case, once one of the conditions is met, the single state gets set to true, allowing the logic to flow.
   * TODO: Think if it makes sense to memoize / derive that state instead? Gonna be tricky with an interval involved.
   */
  useEffect(() => {
    if (consent) {
      setConsentGiven(consent)
      return
    }

    if (!consentCallback) return
    const consentGivenViaCallback = consentCallback()

    const interval = setInterval(() => {
      setConsentGiven(consent)
    }, 1000)

    // if the user has consented, no reason to continue pinging every sec.
    if (consentGivenViaCallback) {
      clearInterval(interval)
    }

    // clear on onmount
    return () => clearInterval(interval)
  }, [consentCallback, consent])

  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required')
    }

    if (booted) {
      return
    }

    if (!consentGiven) {
      return
    }

    const performBoot = async () => {
      // @todo this should be invoked when booted.
      // It will call out to the API to confirm the
      // appId is valid and return the app configuration.
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
            },
            initialDelay,
            idleTriggers,
            exitIntentTriggers
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
  booted: boolean
  consent?: boolean
  currentTrigger: Trigger
  exitIntentTriggers: boolean
  idleTriggers: boolean
  initialDelay: number
  registerHandler: (trigger: Trigger) => void
  trackEvent: (event: Event) => void
  trackPageView: (pageView: PageView) => void
  unregisterHandler: (trigger: Trigger) => void
}

const defaultFingerprintState: FingerprintContextInterface = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: {},
  exitIntentTriggers: false,
  idleTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {}
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})
