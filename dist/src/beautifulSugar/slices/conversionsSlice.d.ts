import { StateCreator } from 'zustand';
import { Conversion } from '../../client/types';
import { DifiStore } from '../store';
export declare type ConversionsSlice = {
    conversions: {
        conversions: Conversion[];
        setConversions: (val: Conversion[]) => void;
    };
};
export declare const createConversionsSlice: StateCreator<DifiStore, [], [], ConversionsSlice>;
export declare const useConversionsStore: () => {
    conversions: Conversion[];
    setConversions: (val: Conversion[]) => void;
} & import("zustand/esm/vanilla").StoreApi<DifiStore>;
