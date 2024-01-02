import { StateCreator } from 'zustand'
import { IncompleteTrigger, Trigger } from '../../client/types'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type IncompleteTriggersSlice = {
  incompleteTriggers: IncompleteTrigger[]
  setIncompleteTriggers: (val: IncompleteTrigger[]) => void
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

  // @TODO: think if this can instead be a derived value somehow - having multiple sources is never a good idea.
  visibleTriggersIssuedByIncomplete: [],
  setVisibleTriggersIssuedByIncomplete: (val: Trigger[]) =>
    set({ visibleTriggersIssuedByIncomplete: val })
})
