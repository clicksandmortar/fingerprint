import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useStore } from '../beautifulSugar/store'
import { clientHandlers } from '../client/handler'
import { LEGACY_FingerprintConfig, PageView, Trigger } from '../client/types'
import { CollectorProvider } from './CollectorContext'
import { useLogging } from './LoggingContext'
import { MixpanelProvider } from './MixpanelContext'
import { VisitorProvider } from './VisitorContext'

const queryClient = new QueryClient()

export const cookieAccountJWT = 'b2c_token'

/** * @todo - extract */
const useConsentCheck = (consent: boolean, consentCallback: any) => {
  const [consentGiven, setConsentGiven] = useState(consent)
  const { log } = useLogging()
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

    log('Fingerprint Widget Consent: ', consent)

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

  return consentGiven
}

export type FingerprintProviderProps = {
  appId?: string
  children?: React.ReactNode
  consent?: boolean
  consentCallback?: () => boolean
  /**
   * @deprecated
   * This debug param is no longer used.
   * Please use the portal to configure these values.
   */
  debug: never
  defaultHandlers?: Trigger[]
  initialDelay?: number
  exitIntentTriggers?: boolean
  idleTriggers?: boolean
  pageLoadTriggers?: boolean
  /**
   * @deprecated
   * Please use the portal to configure these values. Until then this will act as override
   */
  config?: LEGACY_FingerprintConfig
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = (props: FingerprintProviderProps) => {
  const {
    appId,
    children,
    consent = false,
    consentCallback,
    // TODO: should be renamed to custom handlers or smt
    defaultHandlers = [],
    initialDelay = 0,
    exitIntentTriggers = true,
    idleTriggers = true,
    pageLoadTriggers = true
  } = props

  const { set } = useStore()

  useEffect(() => {
    set({ difiProps: props })
  }, [props])

  const consentGiven = useConsentCheck(consent, consentCallback)

  const [booted, setBooted] = useState(true)
  const [handlers, setHandlers] = useState([
    ...clientHandlers,
    ...defaultHandlers
  ])

  // @todo Move this to a Handlers Context and add logging.
  const addAnotherHandler = React.useCallback(
    // TODO: Handler. not trigger
    (handler: Trigger) => {
      setHandlers((handlers) => {
        return [...handlers, handler]
      })
    },
    [setHandlers]
  )

  useEffect(() => {
    if (!appId) throw new Error('C&M Fingerprint: appId is required')
    if (booted) return
    if (!consentGiven) return

    const performBoot = async () => {
      // TODO: since all the config is being retrieve on any API call including /collect
      // we can probably remove this TODO. It is redundant.

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
    <QueryClientProvider client={queryClient}>
      <FingerprintContext.Provider
        value={{
          appId,
          booted,
          currentTrigger: null,
          registerHandler: addAnotherHandler,
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
          pageLoadTriggers,
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
  )
}

export interface FingerprintContextInterface {
  appId: string
  booted: boolean
  consent?: boolean
  currentTrigger: Trigger | null
  exitIntentTriggers: boolean
  idleTriggers: boolean
  pageLoadTriggers: boolean
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
  currentTrigger: null,
  exitIntentTriggers: false,
  idleTriggers: false,
  pageLoadTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {}
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})
