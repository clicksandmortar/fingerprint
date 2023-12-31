import { StateCreator } from 'zustand';
import { FingerprintProviderProps } from '../../context/FingerprintContext';
import { DifiStore } from '../store';
import { Get, Set } from '../types';
export declare type MutualSlice = {
    set: Set;
    get: Get;
    difiProps: Omit<DifiCombinedProps, 'debug' | 'children'>;
};
declare type DifiCombinedProps = FingerprintContextInterface & Omit<FingerprintProviderProps, 'children'>;
export declare const createMutualSlice: StateCreator<DifiStore, [], [], MutualSlice>;
export interface FingerprintContextInterface {
    appId: string;
    booted: boolean;
    consent?: boolean;
    exitIntentTriggers: boolean;
    idleTriggers: boolean;
    pageLoadTriggers: boolean;
    initialDelay: number;
}
export {};
