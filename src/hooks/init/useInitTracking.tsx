import mixpanel, { Config } from 'mixpanel-browser'
import React, { useEffect } from 'react'
import { useDifiStore, useEntireStore } from '../../beautifulSugar/store'
import { getEnvVars } from '../../utils/getEnvVars'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'
import { useTracking } from '../useTracking'
import { useVisitor } from './useInitVisitor'

const init = (cfg: Partial<Config>) => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  })
}

export type MixpanelProviderProps = {
  children?: React.ReactNode
}

export const useTrackingInit = () => {
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  const { initiated } = useDifiStore((s) => s.tracking)
  const { set } = useEntireStore()

  const { registerUserData } = useTracking()

  useEffect(() => {
    if (!appId) return
    if (!visitor.id) return
    if (initiated) return

    log('MixpanelProvider: booting')

    // setInitiated(true)
    init({ debug: true })
    set((prev) => ({
      tracking: {
        ...prev.tracking,
        initiated: true
      }
    }))

    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel')

    mixpanel.identify(visitor.id)
  }, [appId, visitor?.id, set, initiated, log, registerUserData])

  useEffect(() => {
    if (!initiated) return
    if (!visitor.id) return

    if (!visitor.cohort) {
      log('Able to register user cohort, but none provided. ')
      return
    }

    log('Registering user.cohort')
    registerUserData({
      u_cohort: visitor.cohort
    })
  }, [visitor, registerUserData, initiated, log])

  useEffect(() => {
    if (!visitor.sourceId) return

    registerUserData({
      sourceId: visitor.sourceId
    })
  }, [visitor, registerUserData])
}
