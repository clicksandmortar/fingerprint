import React from 'react'
import { FingerprintProvider } from '../context/FingerprintContext'

export const Widget = () => {
  return (
    <FingerprintProvider appId='my-app-id'>
      <div>Hello World</div>
    </FingerprintProvider>
  )
}
