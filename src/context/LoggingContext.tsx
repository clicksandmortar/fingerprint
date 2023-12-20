// TODO: move
import React from 'react'
import { useLogging as useLoggingII } from '../hooks/useLogging'

export type LoggingProviderProps = {
  children?: React.ReactNode
}

export const useLogging = () => useLoggingII()
