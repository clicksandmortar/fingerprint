import { StateCreator } from 'zustand';
import { Conversion } from '../../client/types';
import { DifiStore } from '../store';
export declare type ConversionsSlice = {
    conversions: Conversion[];
    setConversions: (val: Conversion[]) => void;
};
export declare const createConversionsSlice: StateCreator<DifiStore, [], [], ConversionsSlice>;
export declare const useConversionsStore: () => Conversion[] & import("zustand/esm/vanilla").StoreApi<DifiStore>;
