import { StateCreator } from 'zustand'
import { IncompleteTrigger, Trigger } from '../../client/types'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type IncompleteTriggersSlice = {
  incompleteTriggers: IncompleteTrigger[]
  setIncompleteTriggers: (val: IncompleteTrigger[]) => void
  // TODO: see if it is the time to refactor?
  visibleTriggersIssuedByIncomplete: Trigger[]
  setVisibleTriggersIssuedByIncomplete: (val: Trigger[]) => void
}

export const createincompleteTriggersSlice: StateCreator<
  DifiStore,
  [],
  [],
  IncompleteTriggersSlice
> = (set: Set, _get: Get) => ({
  incompleteTriggers: [],
  setIncompleteTriggers: (val: IncompleteTrigger[]) =>
    set({ incompleteTriggers: val }),
  // @TODO: think if this can insteqd be a derived value somehow.
  // note that shoving the interval into a memo or callback is not the way.
  // IMHO we should aim to NOT update state here to reduce the amount of rerenders if possible.
  visibleTriggersIssuedByIncomplete: [],
  setVisibleTriggersIssuedByIncomplete: (val: Trigger[]) =>
    set({ visibleTriggersIssuedByIncomplete: val })
})
