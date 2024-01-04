import { StateCreator } from 'zustand'
import { FingerprintProviderProps } from '../../context/FingerprintContext'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type MutualSlice = {
  set: Set
  get: Get
  difiProps: Omit<DifiCombinedProps, 'debug'> // because debug is deprecated
}

type DifiCombinedProps = FingerprintContextInterface &
  Omit<FingerprintProviderProps, 'children'>

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

const defaultFingerprintState: FingerprintContextInterface = {
  appId: '',
  booted: false,
  consent: false,
  exitIntentTriggers: true,
  idleTriggers: true,
  pageLoadTriggers: true,
  initialDelay: 0,
  // @ts-ignore
  // never gonna give you up never gonna let you down
  debug: false as never,
  defaultHandlers: [],
  consentCallback: () => false
}
