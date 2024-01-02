import { StateCreator } from 'zustand';
import { DifiStore } from '../store';
export declare type IdleTimeSlice = {
    idleTime: {
        idleTimeout: number;
        setIdleTimeout: (val: number) => void;
        lastTriggerTimeStamp: number | null;
        setLastTriggerTimeStamp: (val: number) => void;
    };
};
export declare const createIdleTimeSlice: StateCreator<DifiStore, [], [], IdleTimeSlice>;
export declare const useIdleTime: () => {
    idleTimeout: number;
    setIdleTimeout: (val: number) => void;
    lastTriggerTimeStamp: number | null;
    setLastTriggerTimeStamp: (val: number) => void;
} & import("zustand/esm/vanilla").StoreApi<DifiStore>;
