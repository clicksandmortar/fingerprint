import { EqualityChecker, StateSelector, StoreApi } from 'zustand';
import { DifiStore } from './store';

export type Set = StoreApi<DifiStore>['setState']
export type Get = StoreApi<DifiStore>['getState']

export type UseBoundStoreCustom<T> = <U>(
  selector: StateSelector<T, U>,
  equalityFn?: EqualityChecker<U>
) => U & StoreApi<T>

export type UseDifiStore = UseBoundStoreCustom<DifiStore>
