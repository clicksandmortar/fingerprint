import * as Sentry from '@sentry/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { TriggerModal } from '../behaviours/TriggerModal'
import { TriggerYoutube } from '../behaviours/TriggerYoutube'
import { PageView, Trigger } from '../client/types'
import { CollectorProvider } from './CollectorContext'
import { LoggingProvider } from './LoggingContext'
import { VisitorProvider } from './VisitorContext'

Sentry.init({
  dsn: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost:8000', 'https:yourserver.io/api/']
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const queryClient = new QueryClient()

// @todo refactor where this lives
type TriggerCallback = (
  trigger: Trigger
) => void | JSX.Element | React.ReactPortal

// @todo refactor where this lives
export type Handler = {
  /**
   * currently supports idle, exit etc, until we agree on a list
   */
  id?: string
  /**
   * modal | youtube, etc. string until we agree on a list
   */
  behaviour?: string
  /**
   * function to be triggered once the id condition is met
   */
  invoke?: TriggerCallback
  /**
   * useful primarily for "idle" id. Trigger the action only after the user has been inactive for a certain time.
   * interval is cleared when the user becomes active and re-set once idle again
   */
  delay?: number
  /**
   * performance. don't run the logic if an explicit skip condition is provided
   */
  skip?: boolean
}

// @todo refactor where this lives
const includedHandlers: Handler[] = [
  {
    id: 'modal',
    behaviour: 'modal',
    invoke: (trigger: Trigger) => <TriggerModal trigger={trigger} />
  },
  {
    id: 'youtube',
    behaviour: 'youtube',
    invoke: (trigger: Trigger) => <TriggerYoutube trigger={trigger} />
  }
]

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
  const [handlers, setHandlers] = useState(defaultHandlers || includedHandlers)

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
    // @ts-ignore
    <Sentry.ErrorBoundary
      fallback={<p>An error with Fingerprint has occurred.</p>}
      onError={(error, info) => console.error(error, info)}
    >
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
              <CollectorProvider handlers={handlers}>
                <ErrorBoundary
                  onError={(error, info) => console.error(error, info)}
                  fallback={<div>An application error occurred.</div>}
                >
                  {children}
                </ErrorBoundary>
              </CollectorProvider>
            </VisitorProvider>
          </FingerprintContext.Provider>
        </QueryClientProvider>
      </LoggingProvider>
    </Sentry.ErrorBoundary>
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
