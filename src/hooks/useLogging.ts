import { useDifiStore } from '../beautifulSugar/store'

type Logging = {
  log: (...message: any) => void
  warn: (...message: any) => void
  error: (...message: any) => void
  info: (...message: any) => void
}

export type LoggingSlice = {
  logging: Logging
}

const disabledLogging: Logging = {
  // we don't want TS to error out when you pass a param here, but NOT using it
  // creates an unused var warning. So we use ts-expect-error to silence it
  //@ts-expect-error no unused vars
  log: (...message) => {},
  //@ts-expect-error no unused vars
  warn: (...message) => {},
  //@ts-expect-error no unused vars
  error: (...message) => {},
  //@ts-expect-error no unused vars
  info: (...message) => {}
}

const enabledLogging: Logging = {
  log: (...message: any) => console.log(...message),
  warn: (...message: any) => console.warn(...message),
  error: (...message: any) => console.error(...message),
  info: (...message: any) => console.info(...message)
}

export const useLogging = (): Logging => {
  const isDebugMode = useDifiStore((s) => s.config.script.debugMode)

  if (isDebugMode) return enabledLogging

  return disabledLogging
}
