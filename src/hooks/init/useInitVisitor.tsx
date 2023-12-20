import React, { useEffect } from 'react'
import { useDifiStore, useEntireStore } from '../../beautifulSugar/store'
import {
  bootstrapVisitor,
  correctCookieSubdomain
} from '../../visitors/bootstrap'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'
export type VisitorProviderProps = {
  children?: React.ReactNode
}

// the
export const useInitVisitor = () => {
  // TODO: add hasVisitorIntiiated ?
  const { booted } = useFingerprint()
  const { log } = useLogging()

  const { session, setSession, setVisitor } = useEntireStore()

  useEffect(() => {
    if (!booted) {
      log('useInitVisitor: not booted')
      return
    }

    log('useInitVisitor: booting')
    bootstrapVisitor({
      setVisitor,
      session,
      setSession
    })

    const updatedCookie = correctCookieSubdomain()
    log('useInitVisitor: Correcting cookie domain to', updatedCookie)
  }, [booted, session, setSession, setVisitor, log])

  // turn into hook?
  return null
}

export const useVisitor = () => useDifiStore((s) => s)
