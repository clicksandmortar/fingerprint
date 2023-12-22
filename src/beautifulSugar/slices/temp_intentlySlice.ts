import { StateCreator } from 'zustand'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

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
