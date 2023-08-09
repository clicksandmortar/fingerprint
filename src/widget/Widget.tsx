import React from 'react'
import { FingerprintProvider } from '../context/FingerprintContext'

type Props = {
  appId?: string
  consent?: boolean
  debug?: boolean
}

export const Widget = ({ appId, consent, debug }: Props) => {
  return <FingerprintProvider appId={appId} consent={consent} debug={debug} />
}
