import { StateCreator } from 'zustand'
import { clientHandlers, Handler } from '../../client/handler'
import { Trigger } from '../../client/types'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type HandlersSlice = {
  handlers: Handler[]
  addHandlers: (handlers: Handler[]) => void
  getHandlerForTrigger: (trigger: Trigger) => Handler | null
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
  },
  getHandlerForTrigger: (_trigger: Trigger) => {
    const potentialHandler = get().handlers?.find(
      (handler) => handler.behaviour === _trigger.behaviour
    )

    if (!potentialHandler) return null

    return potentialHandler
  }
})
