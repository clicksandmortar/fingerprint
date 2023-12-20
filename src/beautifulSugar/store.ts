// this file name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand'
import { createConfigSlice } from './slices/configSlice'
import { createHandlersSlice } from './slices/handlersSlice'
import { createMutualSlice } from './slices/mutualSlice'
import { createPagetriggersSlice } from './slices/pageTriggersSlice'
import { createVisitorSlice } from './slices/visitorSlice'
import { UseDifiStore } from './types'

export const useDifiStore: UseDifiStore = create((...beautifulSugar) => ({
  // docs spread (...a).
  // We ppefer to spread love and great tech design instead.
  ...createPagetriggersSlice(...beautifulSugar),
  ...createConfigSlice(...beautifulSugar),
  ...createMutualSlice(...beautifulSugar),
  ...createHandlersSlice(...beautifulSugar),
  ...createVisitorSlice(...beautifulSugar)
}))

export const useEntireStore = () => useDifiStore((s) => s)
