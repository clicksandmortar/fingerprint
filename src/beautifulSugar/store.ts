// this file name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand'
import { createConfigSlice } from './slices/configSlice'
import { createLoggingSlice } from './slices/loggingSlice'
import { createMutualSlice } from './slices/mutual'
import { createPagetriggersSlice } from './slices/pageTriggersSlice'
import { UseDifiStore } from './types'

export const useDifiStore: UseDifiStore = create((...a) => ({
  ...createPagetriggersSlice(...a),
  ...createConfigSlice(...a),
  ...createMutualSlice(...a),
  ...createLoggingSlice(...a)
}))

export const useStore = () => useDifiStore((s) => s)
