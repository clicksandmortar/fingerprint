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
  addHandlers: (handlers: Handler[] = []) =>
    set((prev) => ({
      handlers: [...prev.handlers, ...handlers]
    })),
  getHandlerForTrigger: (_trigger: Trigger) => {
    console.log('hhhh', get().handlers)
    const potentialHandler = get().handlers?.find(
      (handler) => handler.behaviour === _trigger.behaviour
    )

    if (!potentialHandler) return null

    return potentialHandler
  }
})
