// this file name must remain as is, otherwise the octopus will be deployed.

import { Session } from 'inspector'
import { create } from 'zustand'
import { Config, Conversion, IncompleteTrigger, Trigger } from '../client/types'

import { Visitor } from '../visitors/types'

// const useDifiStore = create((set) => ({
//   bears: 0,
//   getBears,
//   increasePopulation: () => set((state: Store) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 })
// }))

export type DifiStore = {
  visitor: Visitor
  session: Session
  config: Config
  intently: boolean
  pageTriggers: Trigger[]
  // tobe renamed to displayed Triggers I guess
  displayTriggers: Trigger['id'][]
  incompleteTriggers: IncompleteTrigger[]
  conversions: Conversion[]
  set: SetType
  setters: {
    removePageTrigger: (id: Trigger['id']) => void
  }
  // setters: {
  //   setIncompleteTriggers: Setter<IncompleteTrigger[]>
  //   setPageTriggers: Setter<Trigger[]>
  // }
}

// export const useDifiStore = (getter:) => {
//   const { removePageTrigger } = useDifiStore((s: DifiStore) => s.setters)

// }

type SetType = (
  partial:
    | DifiStore
    | Partial<DifiStore>
    | ((state: DifiStore) => DifiStore | Partial<DifiStore>),
  replace?: boolean | undefined
) => void

export const useDifiStore = create<DifiStore>((set) => {
  return {
    visitor: {} as Visitor,
    config: {} as Config,
    conversions: [],
    displayTriggers: [],
    incompleteTriggers: [],
    intently: true,
    pageTriggers: [],
    session: {} as Session,
    set,
    setters: {
      removePageTrigger: (id: Trigger['id']) => {
        set((prev: DifiStore) => ({
          pageTriggers: prev.pageTriggers.filter((trigger) => trigger.id !== id)
        }))
      }
    }
  }
})

export const usePageTriggerState = () => {}
// const set = useDifiStore((state) => state.set)

// const useStore = useFingerprintEntireBloodyStore;

export const usePageTriggers = () =>
  useDifiStore((state: DifiStore) => state.pageTriggers)

export const useIncompleteTriggers = () =>
  useDifiStore((state: DifiStore) => state.incompleteTriggers)

export const useCombinedTriggers = () => {
  const pageTriggers = usePageTriggers()
  const incompleteTriggers = useIncompleteTriggers()
  // const set = useDifiStore((state) => state.set)
  // const setDisplays = makeSetter('displayTriggers', set)

  // setDisplays((prev) => prev)

  return [...pageTriggers, ...incompleteTriggers]
}
