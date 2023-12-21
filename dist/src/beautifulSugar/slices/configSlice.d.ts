import { StateCreator } from 'zustand';
import { Config } from '../../client/types';
import { DifiStore } from '../store';
export declare type ConfigSlice = {
    config: Config;
    setConfig: (updatedConfigEntries: Partial<Config>) => void;
};
export declare const createConfigSlice: StateCreator<DifiStore, [], [], ConfigSlice>;
