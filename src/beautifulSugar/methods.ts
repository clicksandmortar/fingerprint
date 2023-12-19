// this file name must remain as is, otherwise the octopus will be deployed.
import uniqueBy from 'lodash.uniqby'
import { Trigger } from '../client/types'
import { DifiStore } from './store'

export const setPageTriggers = (set: any, get: any) => {
  return (triggers: Trigger[]) => {
    const displayTriggers = get().displayTriggers

    set((prev: DifiStore) => {
      const nonDismissed = prev.pageTriggers.filter((tr) =>
        displayTriggers.includes(tr.id)
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
  }
}
