import mixpanel, { Callback, Config } from 'mixpanel-browser'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useFingerprint } from '../hooks/useFingerprint'
import { getEnvVars } from '../utils/getEnvVars'
import { RegistrableUserProperties } from '../utils/types'
import { useLogging } from './LoggingContext'
import { useVisitor } from './VisitorContext'

const init = (cfg: Partial<Config>) => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  })
}

type TrackerState = {
  initiated: boolean
}

const trackEvent = (event: string, props: any, callback?: Callback): void => {
  return mixpanel.track(event, props, callback)
}

export type MixpanelProviderProps = {
  children?: React.ReactNode
}

export const MixpanelProvider = ({ children }: MixpanelProviderProps) => {
  const { appId } = useFingerprint()
  const { visitor } = useVisitor()
  const { log } = useLogging()
  const [initiated, setInitiated] = useState(false)

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

  return (
    <MixpanelContext.Provider
      value={{
        trackEvent,
        registerUserData,
        state: {
          initiated
        }
      }}
    >
      {children}
    </MixpanelContext.Provider>
  )
}

export type MixpanelContextInterface = {
  trackEvent: (event: string, props: any, callback?: Callback) => void
  registerUserData: (props: RegistrableUserProperties) => void
  state: TrackerState
}

export const MixpanelContext = createContext<MixpanelContextInterface>({
  trackEvent: () =>
    console.error(
      'Mixpanel: trackEvent not setup properly. Check your Context order.'
    ),
  registerUserData: () =>
    console.error(
      'Mixpanel: registerUserData not setup properly. Check your Context order.'
    ),
  state: {
    initiated: false
  }
})

export const useMixpanel = () => {
  return useContext(MixpanelContext)
}
