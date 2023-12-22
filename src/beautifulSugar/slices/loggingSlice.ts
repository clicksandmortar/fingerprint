import { StateCreator } from 'zustand'
// import { logging } from '../../client/types'
import { getLoggingContext, Logging } from '../../hooks/useLogging'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type LoggingSlice = {
  logging: Logging
}

// NOTE: this slice is used only so we have access to debug-controlled logging
// inside the store methods. For regular code use the `useLogging()` hook instead.
export const createLoggingSlice: StateCreator<
  DifiStore,
  [],
  [],
  LoggingSlice
> = (_set: Set, get: Get) => ({
  logging: getLoggingContext(get?.()?.config?.script?.debugMode)
})
