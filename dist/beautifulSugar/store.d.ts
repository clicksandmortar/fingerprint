/// <reference types="node" />
import { Session } from 'inspector';
import { Config, Conversion, IncompleteTrigger, Trigger } from '../client/types';
import { Visitor } from '../visitors/types';
export declare type DifiStore = {
    visitor: Visitor;
    session: Session;
    config: Config;
    intently: boolean;
    pageTriggers: Trigger[];
    displayTriggers: Trigger['id'][];
    incompleteTriggers: IncompleteTrigger[];
    conversions: Conversion[];
    set: SetType;
    setters: {
        removePageTrigger: (id: Trigger['id']) => void;
    };
};
declare type SetType = (partial: DifiStore | Partial<DifiStore> | ((state: DifiStore) => DifiStore | Partial<DifiStore>), replace?: boolean | undefined) => void;
export declare const useDifiStore: any;
export declare const usePageTriggerState: () => void;
export declare const usePageTriggers: () => any;
export declare const useIncompleteTriggers: () => any;
export declare const useCombinedTriggers: () => any[];
export {};
