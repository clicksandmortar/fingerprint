import { StateCreator } from 'zustand'
import { FingerprintProviderProps } from '../../context/FingerprintContext'
import { DifiStore, Get, Set } from '../types'

export type MutualSlice = {
  set: Set
  get: Get
  difiProps: Omit<FingerprintProviderProps, 'debug'> // because debug is deprecated
}

export const createMutualSlice: StateCreator<DifiStore, [], [], MutualSlice> = (
  set: Set,
  get: Get
) => ({
  set,
  get,
  difiProps: {}
})
