// TODO: move
import React from 'react'
import { useDifiStore } from '../beautifulSugar/store'

export type LoggingProviderProps = {
  children?: React.ReactNode
}

export const useLogging = () => {
  return useDifiStore((s) => s.logging)
}
