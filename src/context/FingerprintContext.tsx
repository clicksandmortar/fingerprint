/* eslint-disable require-jsdoc */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactElement, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useEntireStore } from '../beautifulSugar/store'
import { Handler } from '../client/handler'
import { LEGACY_FingerprintConfig } from '../client/types'
import { useConsentCheck } from '../hooks/useConsentCheck'
import Runners from './Runners'
import { Triggers } from './useTriggers'

const queryClient = new QueryClient()

/** * @todo - extract */

export type FingerprintProviderProps = {
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
  // This is just to please typescript in this one off case.
  // Normally we'd use `children: ReactNode`
  children: ReactElement | null | ReactElement
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
function Initiator(props: FingerprintProviderProps) {
  const { set, get, addHandlers, difiProps } = useEntireStore()
  const { booted, appId, consentCallback, defaultHandlers } = difiProps

  const setBooted = React.useCallback(
    (val: boolean) =>
      set((prev) => ({ difiProps: { ...prev.difiProps, booted: val } })),
    [set]
  )

  const matchPropsToDifiProps = React.useCallback(() => {
    set((prev) => ({
      difiProps: {
        ...prev.difiProps,
        ...props
      }
    }))
  }, [props, set])

  const consentGiven = useConsentCheck(props.consent || false, consentCallback)
  const hasStoreInitiated = !!get && !!set

  useEffect(() => {
    // if the props have never been provided, throw an error.
    if (!props.appId) throw new Error('C&M Fingerprint: appId is required')
    console.log('blaaaa 1', { difiProps, props })
    matchPropsToDifiProps()

    // otherwise, wait until zustand initiates and start taking values from there
    if (!appId) return
    console.log('blaaaa 2')
    if (booted) return
    console.log('blaaaa 3')
    if (!consentGiven) return
    console.log('blaaaa 4')
    if (!hasStoreInitiated) return
    console.log('blaaaa 5')
    addHandlers(defaultHandlers || [])

    setBooted(true)
  }, [
    appId,
    consentGiven,
    hasStoreInitiated,
    booted,
    props.appId,
    matchPropsToDifiProps,
    defaultHandlers,
    addHandlers,
    setBooted
  ])

  if (!appId) return null
  console.log('blaaaa 6')
  // TOOD: do we want to return children here?
  // booted is false until consent is true, so this will never be rendered otherwise
  if (!booted) return null

  return props.children
}

export function FingerprintProvider(props: FingerprintProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onError={(error, info) => console.error(error, info)}
        fallback={<div>An application error occurred.</div>}
      >
        <Runners />
        <Initiator {...props} />

        <Triggers />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}
