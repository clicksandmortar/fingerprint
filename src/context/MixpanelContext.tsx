import mixpanel, { Callback, Config } from 'mixpanel-browser'
import React, { createContext, useContext, useEffect } from 'react'
import { useFingerprint } from '../hooks/useFingerprint'
import { getEnvVars } from '../utils/getEnvVars'
import { useLogging } from './LoggingContext'
import { useVisitor } from './VisitorContext'

const init = (cfg: Partial<Config>) => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  })
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

  useEffect(() => {
    if (!appId || !visitor.id) {
      return
    }

    log('MixpanelProvider: booting')

    init({ debug: true })

    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel')

    mixpanel.identify(visitor.id)
  }, [appId, visitor?.id])

  return (
    <MixpanelContext.Provider
      value={{
        trackEvent
      }}
    >
      {children}
    </MixpanelContext.Provider>
  )
}

export type MixpanelContextInterface = {
  trackEvent: (event: string, props: any, callback?: Callback) => void
}

export const MixpanelContext = createContext<MixpanelContextInterface>({
  trackEvent: () => {}
})

export const useMixpanel = () => {
  return useContext(MixpanelContext)
}
