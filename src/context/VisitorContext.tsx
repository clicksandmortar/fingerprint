import React, { createContext, useContext, useEffect, useState } from 'react'
import { useFingerprint } from '../hooks/useFingerprint'
import { bootstrapSession } from '../sessions/bootstrap'
import { Session } from '../sessions/types'
import { bootstrapVisitor } from '../visitors/bootstrap'
import { Visitor } from '../visitors/types'
import { useLogging } from './LoggingContext'

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
        setVisitor,
        session,
        setSession
      })
    }

    boot()

    log('VisitorProvider: booted', session, visitor)
  }, [appId, booted])

  const setVisitorData = React.useCallback(
    (prop: Partial<Visitor>) => {
      setVisitor((visitor) => ({ ...visitor, ...prop }))
    },
    [setVisitor]
  )

  return (
    <VisitorContext.Provider
      value={{
        session,
        visitor,
        setVisitor: setVisitorData
      }}
    >
      {children}
    </VisitorContext.Provider>
  )
}

export type VisitorContextInterface = {
  session: Session
  visitor: Visitor
  setVisitor: (visitor: Partial<Visitor>) => void
}

export const VisitorContext = createContext<VisitorContextInterface>({
  session: {},
  visitor: {},
  setVisitor: () =>
    console.error(
      'VisitorContext: setVisitor not setup properly. Check your Context order.'
    )
})

export const useVisitor = () => {
  return useContext(VisitorContext)
}
