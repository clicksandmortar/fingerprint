type EnvVars = {
  FINGERPRINT_API_HOSTNAME: string
  MIXPANEL_TOKEN: string
  SENTRY_DSN: string
}

export function getEnvVars(): EnvVars {
  // TODO: find a proper way to manage env vars.
  // AT THE MOMENT, literally uncomment / recomment the bit needed based on branch.
  // DO NOTE during merges

  // production
  // return {
  //   FINGERPRINT_API_HOSTNAME:
  //     'https://target-engine-api.starship-production.com',
  //   MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27',
  //   SENTRY_DSN:
  //     'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144'
  // }

  // dev
  return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-staging.com',
    MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95',
    SENTRY_DSN: ''
  }
}
