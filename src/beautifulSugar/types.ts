import { EqualityChecker, StateSelector, StoreApi } from 'zustand'
import { LoggingSlice } from '../hooks/useLogging'
import { ConfigSlice } from './slices/configSlice'
import { HandlersSlice } from './slices/handlersSlice'
import { MutualSlice } from './slices/mutualSlice'
import { PageTriggersSlice } from './slices/pageTriggersSlice'
import { VisitorSlice } from './slices/visitorSlice'

export type DifiStore = PageTriggersSlice &
  ConfigSlice &
  MutualSlice &
  LoggingSlice &
  HandlersSlice &
  VisitorSlice

export type Set = StoreApi<DifiStore>['setState']
export type Get = StoreApi<DifiStore>['getState']

export type UseBoundStoreCustom<T> = <U>(
  selector: StateSelector<T, U>,
  equalityFn?: EqualityChecker<U>
) => U & StoreApi<T>

export type UseDifiStore = UseBoundStoreCustom<DifiStore>
