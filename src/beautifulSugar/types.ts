import { EqualityChecker, StateSelector, StoreApi } from 'zustand'
import { ConfigSlice } from './slices/configSlice'
import { PageTriggersSlice } from './slices/pageTriggersSlice'

export type DifiStore = PageTriggersSlice & ConfigSlice

export type Set = StoreApi<DifiStore>['setState']
export type Get = StoreApi<DifiStore>['getState']

export type UseBoundStoreCustom<T> = <U>(
  selector: StateSelector<T, U>,
  equalityFn?: EqualityChecker<U>
) => U & StoreApi<T>

export type UseDifiStore = UseBoundStoreCustom<DifiStore>
