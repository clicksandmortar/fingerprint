import { StateCreator } from 'zustand'
import { DifiStore, useDifiStore } from '../store'
import { Get, Set } from '../types'

export type IdleTimeSlice = {
  idleTime: {
    idleTimeout: number
    setIdleTimeout: (val: number) => void
    lastTriggerTimeStamp: number | null
    setLastTriggerTimeStamp: (val: number) => void
  }
}

export const createIdleTimeSlice: StateCreator<
  DifiStore,
  [],
  [],
  IdleTimeSlice
> = (set: Set, get: Get) => ({
  idleTime: {
    idleTimeout: get()?.config?.trigger?.userIdleThresholdSecs * 1000,
    setIdleTimeout: (val: number) =>
      set((prev) => ({
        idleTime: {
          ...prev.idleTime,
          idleTimeout: val
        }
      })),
    lastTriggerTimeStamp: null,
    setLastTriggerTimeStamp: (val: number | null) =>
      set((prev) => ({
        idleTime: {
          ...prev.idleTime,
          lastTriggerTimeStamp: val
        }
      }))
  }
})
export const useIdleTime = () => useDifiStore((s) => s.idleTime)
