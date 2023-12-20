import React, { useEffect } from 'react'
import { useDifiStore, useStore } from '../beautifulSugar/store'
import { useFingerprint } from '../hooks/useFingerprint'
import { bootstrapSession } from '../sessions/bootstrap'
import { Session } from '../sessions/types'
import { bootstrapVisitor, correctCookieSubdomain } from '../visitors/bootstrap'
import { Visitor } from '../visitors/types'
import { useLogging } from './LoggingContext'
export type VisitorProviderProps = {
  children?: React.ReactNode
}

export const VisitorProvider = () => {
  const { appId, booted } = useFingerprint()
  const { log } = useLogging()

  const { session, setSession, visitor, set } = useStore()
  // TODO: unmodify?
  const setVisitor = (val: Visitor) => set({ visitor: val })

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

      const updatedCookie = correctCookieSubdomain()
      log('FingerprintContext: Correcting cookie domain to', updatedCookie)
    }

    boot()

    log('VisitorProvider: booted', session, visitor)
  }, [appId, booted])

  // turn into hook?
  return null
}

export type VisitorContextInterface = {
  session: Session
  visitor: Visitor
  setVisitor: (visitor: Partial<Visitor>) => void
}

export const useVisitor = () => useDifiStore((s) => s)
