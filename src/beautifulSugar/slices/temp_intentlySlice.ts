import { StateCreator } from 'zustand'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

// TODO: remove this mid-january 2024
export type IntentlySlice = {
  intently: boolean
  setIntently: (intently: boolean) => void
}

export const createIntentlySlice: StateCreator<
  DifiStore,
  [],
  [],
  IntentlySlice
> = (set: Set, _get: Get) => ({
  intently: true,
  setIntently: (val: boolean) => {
    set({ intently: val })
  }
})
