import { EqualityChecker, StateSelector, StoreApi } from 'zustand';
import { DifiStore } from './store';
export declare type Set = StoreApi<DifiStore>['setState'];
export declare type Get = StoreApi<DifiStore>['getState'];
export declare type UseBoundStoreCustom<T> = <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>) => U & StoreApi<T>;
export declare type UseDifiStore = UseBoundStoreCustom<DifiStore>;
