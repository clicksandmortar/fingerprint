import React, { createContext, useEffect, useState } from 'react'
import { SessionState } from '../sessions/types'
import { VisitorState } from '../visitors/types'
import { useLogging } from './LoggingContext'
import { bootstrapSession } from '../sessions/bootstrap'
import { bootstrapVisitor } from '../visitors/bootstrap'
import { useFingerprint } from './FingerprintContext'

export type VisitorProviderProps = {
  children?: React.ReactNode
}

export type VisitorContextInterface = {}

export const VisitorProvider = ({ children }: VisitorProviderProps) => {
  const { appId, booted } = useFingerprint()
  const { log } = useLogging()
  const [session, setSession] = useState<SessionState>({})
  const [visitor, setVisitor] = useState<VisitorState>({})

  console.log('VisitorProvider')

  useEffect(() => {
    if (!booted) {
      log('VisitorProvider: not booted')
      return
    }

    log('VisitorProvider: booting')

    const boot = async () => {
      await bootstrapSession({
        appId,
        setSession
      })

      await bootstrapVisitor({
        setVisitor
      })
    }

    boot()

    log('VisitorProvider: booted', session, visitor)
  }, [appId, booted])

  return (
    <VisitorContext.Provider value={{}}>{children}</VisitorContext.Provider>
  )
}

export const VisitorContext = createContext<VisitorContextInterface>({})
