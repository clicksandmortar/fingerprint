/// <reference types="node" />
import { Session } from 'inspector';
import { EqualityChecker, StateSelector, StoreApi } from 'zustand';
import { Config, Conversion, Trigger } from '../client/types';
import { Visitor } from '../visitors/types';
declare type Set = StoreApi<DifiStore>['setState'];
declare type Get = StoreApi<DifiStore>['getState'];
declare type UseBoundStoreAlt<T> = <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>) => U & StoreApi<T>;
export declare type DifiStore = {
    visitor: Visitor;
    session: Session;
    config: Config;
    intently: boolean;
    pageTriggers: Trigger[];
    displayedTriggersIds: Trigger['id'][];
    conversions: Conversion[];
    set: Set;
    get: Get;
    setDisplayedTriggers: (triggers: Trigger['id'][]) => void;
    setPageTriggers: (triggers: Trigger[]) => void;
    removePageTrigger: (id: Trigger['id']) => void;
};
export declare const useDifiStore: UseBoundStoreAlt<DifiStore>;
export declare const useStore: () => DifiStore & StoreApi<DifiStore>;
export declare const usePageTriggerState: () => void;
export declare const usePageTriggers: () => Trigger[] & StoreApi<DifiStore>;
export declare const useDisplayedTriggers: () => string[] & StoreApi<DifiStore>;
export {};
