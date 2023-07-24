import React from 'react'
import { FingerprintProvider } from '../context/FingerprintContext'

type Props = {
  appId?: string
  debug?: boolean
}

export const Widget = ({ appId, debug }: Props) => {
  return <FingerprintProvider appId={appId} debug={debug} />
}
