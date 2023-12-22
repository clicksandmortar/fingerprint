import React, { useEffect } from 'react'
import { useDifiStore, useEntireStore } from '../../beautifulSugar/store'
import { bootstrapSession } from '../../sessions/bootstrap'
import { useLogging } from '../useLogging'
export type VisitorProviderProps = {
  children?: React.ReactNode
}

export const useInitSession = () => {
  const { appId, booted } = useDifiStore((s) => s.difiProps)
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

export const useSession = () => useEntireStore()
