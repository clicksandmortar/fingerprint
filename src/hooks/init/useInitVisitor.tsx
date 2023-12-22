import React, { useEffect } from 'react'
import { useDifiStore, useEntireStore } from '../../beautifulSugar/store'
import {
  bootstrapVisitor,
  correctCookieSubdomain
} from '../../visitors/bootstrap'
import { useLogging } from '../useLogging'
export type VisitorProviderProps = {
  children?: React.ReactNode
}

// the
export const useInitVisitor = () => {
  const { log } = useLogging()

  const {
    session,
    setSession,
    setVisitor,
    difiProps: { booted }
  } = useEntireStore()

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

  return null
}

export const useVisitor = () => useDifiStore((s) => s)
