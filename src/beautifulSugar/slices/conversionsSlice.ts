import { StateCreator } from 'zustand'
import { Conversion } from '../../client/types'
import { DifiStore, useDifiStore } from '../store'
import { Get, Set } from '../types'

export type ConversionsSlice = {
  conversions: {
    conversions: Conversion[]
    setConversions: (val: Conversion[]) => void
  }
}

export const createConversionsSlice: StateCreator<
  DifiStore,
  [],
  [],
  ConversionsSlice
> = (set: Set, _get: Get) => ({
  conversions: {
    conversions: [],
    setConversions: (val: Conversion[]) =>
      set((prev) => ({
        conversions: {
          ...prev.conversions,
          conversions: val
        }
      }))
  }
})

export const useConversionsStore = () => useDifiStore((s) => s.conversions)
