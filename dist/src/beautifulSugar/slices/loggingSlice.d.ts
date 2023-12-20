import { StateCreator } from 'zustand';
import { DifiStore } from '../types';
declare type Logging = {
    log: (...message: any) => void;
    warn: (...message: any) => void;
    error: (...message: any) => void;
    info: (...message: any) => void;
};
export declare type LoggingSlice = {
    logging: Logging;
};
export declare const createLoggingSlice: StateCreator<DifiStore, [], [], LoggingSlice>;
export declare const useLogging: () => Logging;
export {};
