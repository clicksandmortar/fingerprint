import mixpanel, { Callback, Config } from 'mixpanel-browser'
import React, { useEffect } from 'react'
import { useDifiStore } from '../../beautifulSugar/store'
import { getEnvVars } from '../../utils/getEnvVars'
import { RegistrableUserProperties } from '../../utils/types'
import { useFingerprint } from '../useFingerprint'
import { useLogging } from '../useLogging'
import { useVisitor } from './useInitVisitor'

const init = (cfg: Partial<Config>) => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  })
}

// type TrackerState = {
//   initiated: boolean
// }

const trackEvent = (event: string, props: any, callback?: Callback): void => {
  return mixpanel.track(event, props, callback)
}

export type MixpanelProviderProps = {
  children?: React.ReactNode
}

export const useInitTracking = () => {
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  const { initiated, setInitiated } = useDifiStore((s) => s.tracking)

  useEffect(() => {
    if (!appId || !visitor.id) {
      return
    }

    log('MixpanelProvider: booting')

    init({ debug: true })
    setInitiated(true)

    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel')

    mixpanel.identify(visitor.id)
  }, [appId, visitor?.id])

  const registerUserData = React.useCallback(
    (properties: RegistrableUserProperties) => {
      log(
        `Mixpanel: attempting to'register/override properties: ${Object.keys(
          properties
        ).join(', ')}`
      )

      mixpanel.people.set(properties)
    },
    [log]
  )

  useEffect(() => {
    if (!visitor.cohort) {
      log('Able to register user cohort, but none provided. ')
      return
    }

    registerUserData({
      u_cohort: visitor.cohort
    })
  }, [visitor, registerUserData])

  useEffect(() => {
    if (!visitor.sourceId) return

    registerUserData({
      sourceId: visitor.sourceId
    })
  }, [visitor, registerUserData])

  return {
    trackEvent,
    registerUserData,
    state: {
      initiated
    }
  }
}
