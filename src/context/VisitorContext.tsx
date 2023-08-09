import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '../sessions/types'
import { Visitor } from '../visitors/types'
import { useLogging } from './LoggingContext'
import { bootstrapSession } from '../sessions/bootstrap'
import { bootstrapVisitor } from '../visitors/bootstrap'
import { useFingerprint } from '../hooks/useFingerprint'

export type VisitorProviderProps = {
  children?: React.ReactNode
}

export const VisitorProvider = ({ children }: VisitorProviderProps) => {
  const { appId, booted } = useFingerprint()
  const { log } = useLogging()
  const [session, setSession] = useState<Session>({})
  const [visitor, setVisitor] = useState<Visitor>({})

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
    <VisitorContext.Provider
      value={{
        session,
        visitor
      }}
    >
      {children}
    </VisitorContext.Provider>
  )
}

export type VisitorContextInterface = {
  session: Session
  visitor: Visitor
}

export const VisitorContext = createContext<VisitorContextInterface>({
  session: {},
  visitor: {}
})

export const useVisitor = () => {
  return useContext(VisitorContext)
}
