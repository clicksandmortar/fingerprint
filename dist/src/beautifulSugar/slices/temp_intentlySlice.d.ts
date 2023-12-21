import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
export declare type IntentlySlice = {
    intently: {
        isIntently: boolean;
        setIntently: (intently: boolean) => void;
    };
};
export declare const createMutualSlice: StateCreator<DifiStore, [], [], IntentlySlice>;
