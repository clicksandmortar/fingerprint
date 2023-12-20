import React, { useEffect } from 'react'
import { useEntireStore } from '../../beautifulSugar/store'
import { bootstrapSession } from '../../sessions/bootstrap'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'
export type VisitorProviderProps = {
  children?: React.ReactNode
}

export const useInitSession = () => {
  // TODO: add hasSessionInitiated ?
  const { appId, booted } = useFingerprint()
  const { log } = useLogging()

  const { setSession } = useEntireStore()

  useEffect(() => {
    if (!booted) {
      log('useInitSession: not booted yet')
      return
    }

    log('useInitSession: booting')

    bootstrapSession({
      appId,
      setSession
    })
  }, [appId, booted])
}

// the
// TODO: nav proper
export const useSession = () => useEntireStore()
