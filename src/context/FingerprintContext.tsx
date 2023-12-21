import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useEntireStore } from '../beautifulSugar/store'
import { Handler } from '../client/handler'
import { LEGACY_FingerprintConfig } from '../client/types'
import { useInitSession } from '../hooks/init/useInitSession'
import { useTrackingInit } from '../hooks/init/useInitTracking'
import { useInitVisitor } from '../hooks/init/useInitVisitor'
import useButtonCollector from '../hooks/useButtonCollector'
import { useConsentCheck } from '../hooks/useConsentCheck'
import useFormCollector from '../hooks/useFormCollector'
import useIncompleteTriggers from '../hooks/useIncompleteTriggers'
import { CollectorProvider } from './CollectorContext'

const queryClient = new QueryClient()

/** * @todo - extract */

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
export const Provider = (props: FingerprintProviderProps) => {
  const { set, addHandlers, difiProps } = useEntireStore()
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

  // TODO: rename these to "runners" for clarity
  useTrackingInit()
  useInitVisitor()
  useInitSession()
  useIncompleteTriggers()
  useFormCollector()
  useButtonCollector()

  const consentGiven = useConsentCheck(consent, consentCallback)

  useEffect(() => {
    // if the props have never been provided, throw an error.
    if (!props.appId) throw new Error('C&M Fingerprint: appId is required')

    // otherwise, wait until zustand initiates and start taking values from there
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
    return null
  }

  return <CollectorProvider>{children}</CollectorProvider>
}

export const FingerprintProvider = (props: FingerprintProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary
      onError={(error, info) => console.error(error, info)}
      fallback={<div>An application error occurred.</div>}
    >
      {/* TODO: fix - this is an error that is brought from the Script thing during refactor. 
    No actual issue, just TS being a peepee. Its been liek that forever, needs attention */}
      {/* @ts-ignore */}
      <Provider {...props} />
    </ErrorBoundary>
  </QueryClientProvider>
)
