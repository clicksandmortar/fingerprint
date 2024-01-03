import { StateCreator } from 'zustand';
import { Logging } from '../../hooks/useLogging';
import { DifiStore } from '../store';
export declare type LoggingSlice = {
    logging: Logging;
};
export declare const createLoggingSlice: StateCreator<DifiStore, [], [], LoggingSlice>;
