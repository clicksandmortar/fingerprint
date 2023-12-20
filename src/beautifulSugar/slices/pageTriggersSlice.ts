import { Session } from 'inspector'
import uniqueBy from 'lodash.uniqby'
import { StateCreator } from 'zustand'
import { Trigger } from '../../client/types'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type PageTriggersSlice = {
  pageTriggers: Trigger[]
  displayedTriggersIds: Trigger['id'][]
  appendTrigger: (invokableTrigger: Trigger) => void
  setDisplayedTriggers: (triggers: Trigger['id'][]) => void
  setPageTriggers: (triggers: Trigger[]) => void
  removePageTrigger: (id: Trigger['id']) => void
}

export const createPagetriggersSlice: StateCreator<
  PageTriggersSlice,
  [],
  [],
  PageTriggersSlice
> = (set: Set, get: Get) => ({
  pageTriggers: [],
  displayedTriggersIds: [],
  session: {} as Session,
  setDisplayedTriggers: (triggers: Trigger['id'][]) => {
    set(() => ({
      displayedTriggersIds: triggers
    }))
  },
  appendTrigger: (invokableTrigger: Trigger) => {
    set((prev: DifiStore) => {
      if (prev.displayedTriggersIds.includes(invokableTrigger.id)) return prev

      return {
        displayedTriggersIds: [
          ...prev.displayedTriggersIds,
          invokableTrigger.id
        ]
      }
    })
  },

  setPageTriggers: (triggers: Trigger[]) => {
    const displayedTriggers = get().displayedTriggersIds

    set((prev: PageTriggersSlice) => {
      const nonDismissed = prev.pageTriggers.filter((tr) =>
        displayedTriggers.includes(tr.id)
      )
      // no pageTriggers = no triggers, rather than missing key.
      // serverside omition. Means we set pagetriggers to nothing.
      return {
        pageTriggers: uniqueBy<Trigger>(
          [...(triggers || []), ...nonDismissed],
          'id'
        )
      }
    })
  },
  removePageTrigger: (id: Trigger['id']) => {
    set((prev: PageTriggersSlice) => ({
      pageTriggers: prev.pageTriggers.filter((trigger) => trigger.id !== id)
    }))
  }
})
