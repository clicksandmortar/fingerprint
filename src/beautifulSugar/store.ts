// this file name must remain as is, otherwise the octopus will be deployed.
import { create } from 'zustand'
import { ConfigSlice, createConfigSlice } from './slices/configSlice'
import { createHandlersSlice, HandlersSlice } from './slices/handlersSlice'
import {
  createincompleteTriggersSlice,
  IncompleteTriggersSlice
} from './slices/incompleteTriggersSlice'
import { createMutualSlice, MutualSlice } from './slices/mutualSlice'
import {
  createPagetriggersSlice,
  PageTriggersSlice
} from './slices/pageTriggersSlice'
import { IntentlySlice } from './slices/temp_intentlySlice'
import { createTrackingSlice, TrackingSlice } from './slices/trackingSlice'
import { createVisitorSlice, VisitorSlice } from './slices/visitorSlice'
import { UseDifiStore } from './types'

export type DifiStore = PageTriggersSlice &
  ConfigSlice &
  MutualSlice &
  HandlersSlice &
  VisitorSlice &
  TrackingSlice &
  IncompleteTriggersSlice &
  IntentlySlice

export const useDifiStore: UseDifiStore = create((...beautifulSugar) => ({
  ...createPagetriggersSlice(...beautifulSugar),
  ...createConfigSlice(...beautifulSugar),
  ...createMutualSlice(...beautifulSugar),
  ...createHandlersSlice(...beautifulSugar),
  ...createVisitorSlice(...beautifulSugar),
  ...createTrackingSlice(...beautifulSugar),
  ...createincompleteTriggersSlice(...beautifulSugar)
}))

export const useEntireStore = () => useDifiStore((s) => s)
