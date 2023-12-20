import { StateCreator } from 'zustand'
import { clientHandlers, Handler } from '../../client/handler'
import { useDifiStore } from '../store'
import { DifiStore, Get, Set } from '../types'

export type HandlersSlice = {
  handlers: Handler[]
  addHandlers: (handlers: Handler[]) => void
}

export const createHandlersSlice: StateCreator<
  DifiStore,
  [],
  [],
  HandlersSlice
> = (set: Set, get: Get) => ({
  handlers: clientHandlers,
  addHandlers: (handlers: Handler[]) => {
    set({ handlers: [...get().handlers, ...handlers] })
  }
})

export const useLogging = () => useDifiStore((s) => s).getState().logging
