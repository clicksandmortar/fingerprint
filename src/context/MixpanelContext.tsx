import React, { createContext, useContext, useEffect } from 'react'
import { useLogging } from './LoggingContext'
import { useFingerprint } from '../hooks/useFingerprint'
import { useVisitor } from './VisitorContext'
import mixpanel, { Callback, Config } from 'mixpanel-browser'

const MIXPANEL_TOKEN_STAGING = 'd122fa924e1ea97d6b98569440c65a95'

const init = (cfg: Partial<Config>) => {
  // TODO: Create environment separation
  mixpanel.init(MIXPANEL_TOKEN_STAGING, {
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
