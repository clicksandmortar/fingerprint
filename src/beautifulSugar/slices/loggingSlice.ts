import { StateCreator } from 'zustand'
import { useDifiStore } from '../store'
import { DifiStore, Get, Set } from '../types'

type Logging = {
  log: (...message: any) => void
  warn: (...message: any) => void
  error: (...message: any) => void
  info: (...message: any) => void
}

export type LoggingSlice = {
  logging: Logging
}

const noDebugNoLogging: Logging = {
  //@ts-expect-error no unused vars
  log: (...message) => {},
  //@ts-expect-error no unused vars
  warn: (...message) => {},
  //@ts-expect-error no unused vars
  error: (...message) => {},
  //@ts-expect-error no unused vars
  info: (...message) => {}
}

//@ts-expect-error
const debugModeLogging: Logging = {
  log: (...message: any) => console.log(...message),
  warn: (...message: any) => console.warn(...message),
  error: (...message: any) => console.error(...message),
  info: (...message: any) => console.info(...message)
}

export const createLoggingSlice: StateCreator<
  DifiStore,
  [],
  [],
  LoggingSlice
> = (_set: Set, _get: Get) => ({
  logging: noDebugNoLogging
})

export const useLogging = () => useDifiStore((s) => s).getState().logging
