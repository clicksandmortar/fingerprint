import { StateCreator } from 'zustand'
import { FingerprintProviderProps } from '../../context/FingerprintContext'
import { DifiStore, Get, Set } from '../types'

export type MutualSlice = {
  set: Set
  get: Get
  difiProps: Omit<DifiCombinedProps, 'debug'> // because debug is deprecated
}

type DifiCombinedProps = FingerprintContextInterface & FingerprintProviderProps

export const createMutualSlice: StateCreator<DifiStore, [], [], MutualSlice> = (
  set: Set,
  get: Get
) => ({
  set,
  get,
  difiProps: defaultFingerprintState
})

export interface FingerprintContextInterface {
  appId: string
  booted: boolean
  consent?: boolean
  exitIntentTriggers: boolean
  idleTriggers: boolean
  pageLoadTriggers: boolean
  initialDelay: number
}

const defaultFingerprintState: DifiCombinedProps = {
  appId: '',
  booted: false,
  consent: false,
  // TODO: most of these should be deprecated altogether...
  exitIntentTriggers: true,
  idleTriggers: true,
  pageLoadTriggers: true,
  initialDelay: 0,
  debug: false as never,
  defaultHandlers: [],
  consentCallback: () => false
}
