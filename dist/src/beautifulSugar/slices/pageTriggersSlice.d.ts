import { StateCreator } from 'zustand';
import { Trigger } from '../../client/types';
export declare type PageTriggersSlice = {
    pageTriggers: Trigger[];
    displayedTriggersIds: Trigger['id'][];
    addDisplayedTrigger: (invokableTrigger: Trigger) => void;
    setDisplayedTriggers: (triggers: Trigger['id'][]) => void;
    setPageTriggers: (triggers: Trigger[]) => void;
    removePageTrigger: (id: Trigger['id']) => void;
    removeActiveTrigger: (id: Trigger['id']) => void;
};
export declare const createPagetriggersSlice: StateCreator<PageTriggersSlice, [], [], PageTriggersSlice>;
