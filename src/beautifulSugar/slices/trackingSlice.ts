import { StateCreator } from 'zustand'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type TrackingSlice = {
  tracking: {
    initiated: boolean
    setInitiated: (val: boolean) => void
  }
}

export const createTrackingSlice: StateCreator<
  DifiStore,
  [],
  [],
  TrackingSlice
> = (set: Set, _get: Get) => ({
  tracking: {
    initiated: false,
    setInitiated: (val: boolean) =>
      set((prev: DifiStore) => ({
        tracking: {
          ...prev.tracking,
          initiated: val
        }
      }))
  }
})
