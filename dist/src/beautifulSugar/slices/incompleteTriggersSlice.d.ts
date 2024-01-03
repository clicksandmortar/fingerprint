import { StateCreator } from 'zustand';
import { IncompleteTrigger, Trigger } from '../../client/types';
import { DifiStore } from '../store';
export declare type IncompleteTriggersSlice = {
    incompleteTriggers: IncompleteTrigger[];
    setIncompleteTriggers: (val: IncompleteTrigger[]) => void;
    visibleTriggersIssuedByIncomplete: Trigger[];
    setVisibleTriggersIssuedByIncomplete: (val: Trigger[]) => void;
};
export declare const createincompleteTriggersSlice: StateCreator<DifiStore, [], [], IncompleteTriggersSlice>;
