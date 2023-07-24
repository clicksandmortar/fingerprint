import React, { createContext, useContext, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoggingProvider } from './LoggingContext'
import { CollectorProvider } from './CollectorContext'
import { VisitorProvider } from './VisitorContext'

const queryClient = new QueryClient()

export type FingerprintProviderProps = {
  appId?: string
  children?: React.ReactNode
  debug?: boolean
}

// @todo split this into multiple providers, FingerprintProvider should
// only bootstrap the app.
export const FingerprintProvider = (props: FingerprintProviderProps) => {
  const { appId, debug } = props
  const [booted, setBooted] = useState(false)

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
            booted
          }}
        >
          <VisitorProvider>
            <CollectorProvider />
          </VisitorProvider>
        </FingerprintContext.Provider>
      </QueryClientProvider>
    </LoggingProvider>
  )
}

export interface FingerprintContextInterface {
  appId: string
  booted: boolean
}

const defaultFingerprintState: FingerprintContextInterface = {
  appId: '',
  booted: false
}

export const FingerprintContext = createContext<FingerprintContextInterface>({
  ...defaultFingerprintState
})

export const useFingerprint = () => {
  return useContext(FingerprintContext)
}
