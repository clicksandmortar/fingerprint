import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
export declare type IntentlySlice = {
    intently: boolean;
    setIntently: (intently: boolean) => void;
};
export declare const createIntentlySlice: StateCreator<DifiStore, [], [], IntentlySlice>;
