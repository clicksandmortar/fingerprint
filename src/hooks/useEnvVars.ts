import { useContext, useMemo, useState } from 'react'
import { FingerprintContext } from '../context/FingerprintContext'
import { useLogging } from '../context/LoggingContext'

type EnvVars = {
  FINGERPRINT_API_HOSTNAME: string
  MIXPANEL_TOKEN: string
}

const tenantAwareHost = (
  isDev: boolean = false,
  tenant: string = 'mab'
): string => {
  return (
    'https://' +
    tenant +
    '.api.uk.clicksandmortar-' +
    (isDev ? 'staging' : 'production') +
    '.com/fingerprint'
  )
}

export const useEnvVars = (): EnvVars => {
  const { log } = useLogging()
  const { tenantId } = useContext(FingerprintContext)
  // @todo temp hack for managing prod and dev env.
  const [isDev, setIsDev] = useState(false)

  let env: EnvVars = {
    FINGERPRINT_API_HOSTNAME: '',
    MIXPANEL_TOKEN: ''
  }

  useMemo(() => {
    switch (true) {
      case typeof window === 'undefined':
      case window?.location?.host?.includes('localhost'):
      case window?.location?.host?.includes('clicksandmortar.tech'):
      case window?.location?.host.startsWith('stage65-az'):
      case window?.location?.host.startsWith('test65-az'):
      case window?.location?.host.includes('vercel.app'): // Assuming all vercel apps are our staging
        setIsDev(true)
        break
      default:
        setIsDev(false)
    }
  }, [])

  env.FINGERPRINT_API_HOSTNAME = tenantAwareHost(isDev, tenantId)
  env.MIXPANEL_TOKEN = isDev
    ? 'd122fa924e1ea97d6b98569440c65a95'
    : 'cfca3a93becd5735a4f04dc8e10ede27'

  // when we're ready to add it back, Sentry is setup with
  // SENTRY_DSN: 'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144'

  log('Fingerprint Environment: ', env)

  return env
}
