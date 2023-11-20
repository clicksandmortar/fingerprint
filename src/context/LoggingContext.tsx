import React, { createContext, useContext, useEffect } from 'react'
import { useConfig } from '../hooks/useBrandConfig'

export type LoggingProviderProps = {
  debug?: boolean
  children?: React.ReactNode
}

export type LoggingContextInterface = {
  log: (...message: any) => void
  warn: (...message: any) => void
  error: (...message: any) => void
  info: (...message: any) => void
}

// @todo have this provider log pre-boot and post-boot with
// context around the App ID, session, visitor, etc.
export const LoggingProvider = ({ children }: LoggingProviderProps) => {
  const debug = useConfig().config.script.debugMode

  const log = (...message: any) => {
    if (debug) {
      console.log(...message)
    }
  }

  const warn = (...message: any) => {
    if (debug) {
      console.warn(...message)
    }
  }

  const error = (...message: any) => {
    if (debug) {
      console.error(...message)
    }

    // throw new Error(...message)
  }

  const info = (...message: any) => {
    if (debug) {
      console.info(...message)
    }
  }

  useEffect(() => {
    if (!debug) return

    log('LoggingProvider: In Debug Mode')
  })

  return (
    <LoggingContext.Provider
      value={{
        log,
        warn,
        error,
        info
      }}
    >
      {children}
    </LoggingContext.Provider>
  )
}

export const LoggingContext = createContext<LoggingContextInterface>({
  log: () => {},
  warn: () => {},
  error: () => {},
  info: () => {}
})

export const useLogging = () => {
  return useContext(LoggingContext)
}
