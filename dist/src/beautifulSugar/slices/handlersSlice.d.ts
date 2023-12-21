import { StateCreator } from 'zustand';
import { Handler } from '../../client/handler';
import { Trigger } from '../../client/types';
import { DifiStore } from '../store';
export declare type HandlersSlice = {
    handlers: Handler[];
    addHandlers: (handlers: Handler[]) => void;
    getHandlerForTrigger: (trigger: Trigger) => Handler | null;
};
export declare const createHandlersSlice: StateCreator<DifiStore, [], [], HandlersSlice>;
