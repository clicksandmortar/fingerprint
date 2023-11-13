import React from 'react'
import { FingerprintProvider } from '../context/FingerprintContext'

type Props = {
  appId?: string
  tenantId?: string
  // The follow props are deprecated and will be removed in a future release.
  consent?: boolean
  debug?: boolean
}

export const Widget = (props: Props) => {
  const { consent, debug, tenantId } = props

  if (consent || debug) {
    console.warn(
      'The consent and debug props are deprecated and will be removed in a future release. Please update your Fingerprint Widget to use the new script tag.'
    )
  }

  if (!tenantId) {
    console.warn(
      'The tenant prop is required and will be required in a future release. Please update your Fingerprint Widget to use the new script tag.'
    )
  }

  return <FingerprintProvider {...props} />
}
