import { StateCreator } from 'zustand';
import { FingerprintProviderProps } from '../../context/FingerprintContext';
import { DifiStore, Get, Set } from '../types';
export declare type MutualSlice = {
    set: Set;
    get: Get;
    difiProps: Omit<FingerprintProviderProps, 'debug'>;
};
export declare const createMutualSlice: StateCreator<DifiStore, [], [], MutualSlice>;
