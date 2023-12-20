import { StateCreator } from 'zustand';
import { Handler } from '../../client/handler';
import { DifiStore } from '../types';
export declare type HandlersSlice = {
    handlers: Handler[];
    addHandlers: (handlers: Handler[]) => void;
};
export declare const createHandlersSlice: StateCreator<DifiStore, [], [], HandlersSlice>;
export declare const useLogging: () => {
    log: (...message: any) => void;
    warn: (...message: any) => void;
    error: (...message: any) => void;
    info: (...message: any) => void;
};
