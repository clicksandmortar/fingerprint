import uniqueBy from 'lodash.uniqby'
import { StateCreator } from 'zustand'
import { Trigger } from '../../client/types'
import { DifiStore } from '../store'
import { Get, Set } from '../types'

export type PageTriggersSlice = {
  pageTriggers: Trigger[]
  displayedTriggersIds: Trigger['id'][]
  addDisplayedTrigger: (invokableTrigger: Trigger) => void
  setDisplayedTriggers: (triggers: Trigger['id'][]) => void
  setPageTriggers: (triggers: Trigger[]) => void
  removePageTrigger: (id: Trigger['id']) => void
  removeActiveTrigger: (id: Trigger['id']) => void
}

export const createPagetriggersSlice: StateCreator<
  PageTriggersSlice,
  [],
  [],
  PageTriggersSlice
> = (set: Set, get: Get) => ({
  pageTriggers: [],
  displayedTriggersIds: [],
  setDisplayedTriggers: (triggers: Trigger['id'][]) => {
    set(() => ({
      displayedTriggersIds: triggers
    }))
  },
  addDisplayedTrigger: (invokableTrigger: Trigger) => {
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
  },
  removeActiveTrigger: (id: Trigger['id']) => {
    const {
      displayedTriggersIds,
      setDisplayedTriggers,
      incompleteTriggers,
      setIncompleteTriggers,
      visibleTriggersIssuedByIncomplete,
      setVisibleTriggersIssuedByIncomplete,
      removePageTrigger
    } = get()

    // log(`CollectorProvider: removing id:${id} from displayedTriggersIds`)

    const refreshedTriggers = displayedTriggersIds.filter(
      (triggerId: Trigger['id']) => triggerId !== id
    )

    setDisplayedTriggers(refreshedTriggers)

    const updatedIncompleteTriggers = incompleteTriggers.filter(
      (trigger) => trigger.id !== id
    )

    setIncompleteTriggers(updatedIncompleteTriggers)
    const updatedVisibleIncompleteTriggers =
      visibleTriggersIssuedByIncomplete.filter((trigger) => trigger.id !== id)
    setVisibleTriggersIssuedByIncomplete(updatedVisibleIncompleteTriggers)
    removePageTrigger(id)
  }

  // rely on combined triggers:

  // setDisplayedTriggerByInvocation:
})
