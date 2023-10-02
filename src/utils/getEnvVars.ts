type EnvVars = {
  FINGERPRINT_API_HOSTNAME: string
  MIXPANEL_TOKEN: string
}

export function getEnvVars(): EnvVars {
  // TODO: temp hack for managing prod and dev env.
  const isDev = window.location.host.includes('localhost')

  if (isDev)
    return {
      FINGERPRINT_API_HOSTNAME:
        'https://target-engine-api.starship-staging.com',
      MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95'
    }

  return {
    FINGERPRINT_API_HOSTNAME:
      'https://target-engine-api.starship-production.com',
    MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27'
  }
}

// when we're ready to add it back, Sentry is setup with
// SENTRY_DSN:
//     'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144'
