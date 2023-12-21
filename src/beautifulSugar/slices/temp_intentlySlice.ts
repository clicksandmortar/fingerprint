import { StateCreator } from 'zustand'
import { DifiStore, useDifiStore } from '../store'
import { Get, Set } from '../types'

export type IntentlySlice = {
  intently: {
    isIntently: boolean
    setIntently: (intently: boolean) => void
  }
}

export const createMutualSlice: StateCreator<
  DifiStore,
  [],
  [],
  IntentlySlice
> = (set: Set, _get: Get) => ({
  intently: {
    isIntently: true,
    setIntently: (intently: boolean) => {
      set((prev) => ({
        intently: { ...prev.intently, isIntently: intently }
      }))
    }
  }
})
export const useIntentlyStore = () => useDifiStore((s) => s.intently)
