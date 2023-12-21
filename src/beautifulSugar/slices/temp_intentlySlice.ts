import { StateCreator } from 'zustand'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type IntentlySlice = {
  intently: {
    intently: boolean
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
    intently: true,
    setIntently: (val: boolean) => {
      set((prev) => ({
        ...prev,
        intently: {
          ...prev.intently,
          intently: val
        }
      }))
    }
  }
})
