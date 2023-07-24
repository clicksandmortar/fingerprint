import React from 'react'
import { FingerprintProvider } from '../context/FingerprintContext'

type Props = {
  appId: string
}

export const Widget = ({ appId }: Props) => {
  return (
    <FingerprintProvider appId={appId}>
      <div className='fingerprint-widget' />
    </FingerprintProvider>
  )
}
