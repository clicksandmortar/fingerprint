// this file name must remain as is, otherwise the octopus will be deployed.
import { Session } from 'inspector'
import uniqueBy from 'lodash.uniqby'
import { create, EqualityChecker, StateSelector, StoreApi } from 'zustand'
import { Config, Conversion, Trigger } from '../client/types'
import { Visitor } from '../visitors/types'

type Set = StoreApi<DifiStore>['setState']
type Get = StoreApi<DifiStore>['getState']

type UseBoundStoreAlt<T> = <U>(
  selector: StateSelector<T, U>,
  equalityFn?: EqualityChecker<U>
) => U & StoreApi<T>

export type DifiStore = {
  visitor: Visitor
  session: Session
  config: Config
  intently: boolean
  pageTriggers: Trigger[]
  displayedTriggersIds: Trigger['id'][]
  // incompleteTriggers: IncompleteTrigger[]
  // visibleIncompleteTriggers: IncompleteTrigger[]
  // setIncompleteTriggers: (triggers: IncompleteTrigger[]) => void

  // combinedTriggers: (Trigger | IncompleteTrigger)[]
  conversions: Conversion[]
  set: Set
  get: Get
  setDisplayedTriggers: (triggers: Trigger['id'][]) => void
  setPageTriggers: (triggers: Trigger[]) => void
  removePageTrigger: (id: Trigger['id']) => void
}
// TODO: slice'ify
export const useDifiStore: UseBoundStoreAlt<DifiStore> = create<DifiStore>(
  (set: Set, get: Get) => {
    return {
      visitor: {} as Visitor,
      config: {} as Config,
      conversions: [],
      displayedTriggersIds: [],
      // visibleIncompleteTriggers: [],
      // incompleteTriggers: [],
      intently: true,
      pageTriggers: [],
      session: {} as Session,
      // combinedTriggers: [
      // ...get().pageTriggers,
      // ...get().visibleIncompleteTriggers
      // ],
      set,
      get,
      setDisplayedTriggers: (triggers: Trigger['id'][]) => {
        set(() => ({
          displayedTriggersIds: triggers
        }))
      },

      setPageTriggers: (triggers: Trigger[]) => {
        const displayedTriggers = get().displayedTriggersIds

        set((prev: DifiStore) => {
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
        set((prev: DifiStore) => ({
          pageTriggers: prev.pageTriggers.filter((trigger) => trigger.id !== id)
        }))
      }
      // setIncompleteTriggers: (triggers: IncompleteTrigger[]) => {
      //   set(() => ({
      //     incompleteTriggers: triggers
      //   }))
      // }
    }
  }
)

export const useStore = () => useDifiStore((s) => s)

export const usePageTriggerState = () => {}
// const set = useDifiStore((state) => state.set)

// const useStore = useFingerprintEntireBloodyStore;

export const usePageTriggers = () =>
  useDifiStore((state: DifiStore) => state.pageTriggers)

// export const useIncompleteTriggers = () =>
//   useDifiStore((state: DifiStore) => state.incompleteTriggers)

export const useDisplayedTriggers = () =>
  useDifiStore((state: DifiStore) => state.displayedTriggersIds)
