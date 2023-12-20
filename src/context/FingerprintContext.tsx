import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useEntireStore } from '../beautifulSugar/store'
import { Handler } from '../client/handler'
import { LEGACY_FingerprintConfig } from '../client/types'
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

export type FingerprintProviderProps = PropsWithChildren<{
  appId?: string
  consent?: boolean
  consentCallback?: () => boolean
  /**
   * @deprecated
   * This debug param is no longer used.
   * Please use the portal to configure these values.
   */
  debug: never
  defaultHandlers?: Handler[]
  initialDelay?: number
  exitIntentTriggers?: boolean
  idleTriggers?: boolean
  pageLoadTriggers?: boolean
  /**
   * @deprecated
   * Please use the portal to configure these values. Until then this will act as override
   */
  config?: LEGACY_FingerprintConfig
}>

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = (props: FingerprintProviderProps) => {
  const { set, handlers, addHandlers, difiProps } = useEntireStore()
  const {
    booted,
    appId,
    children,
    consent = false,
    consentCallback,
    defaultHandlers
  } = difiProps

  const setBooted = (val: boolean) =>
    set({ difiProps: { ...difiProps, booted: val } })

  useEffect(() => {
    set({
      difiProps: { ...difiProps, ...props }
    })
    addHandlers(defaultHandlers || [])
  }, [props])

  const consentGiven = useConsentCheck(consent, consentCallback)

  // const { visitor } = useVisitor()

  useEffect(() => {
    // if the props have never been probided, throw an error.
    if (!props.appId) throw new Error('C&M Fingerprint: appId is required')

    // otherwise, wait until zustand picks it up
    if (!appId) return
    if (booted) return
    if (!consentGiven) return

    const performBoot = async () => {
      // TODO: since all the config is being retrieve on any API call including /collect
      // we can probably remove this TODO. It is redundant.

      setBooted(true)
    }

    performBoot()
  }, [consentGiven, booted, appId, props.appId])

  if (!appId) {
    return null
  }

  if (!consentGiven) {
    return children
  }

  if (!booted) {
    console.log('booting Difi...')
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <VisitorProvider />
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
    </QueryClientProvider>
  )
}
